<template>
    <div class="webgl-08-renderTarget public-absolute-full-container flex justify-center align-middle">
        <canvas ref="canvas" class="bg-black"></canvas>
    </div>
</template>
<script setup>
import * as THREE from 'three';
import { defineRouteMeta } from '@fesjs/fes';
import { onMounted, ref } from 'vue';

defineRouteMeta({
    name: '08_renderTarget',
    title: '渲染目标',
});

const canvas = ref(null);

onMounted(() => {
    const renderer = new THREE.WebGLRenderer({ canvas: canvas.value, antialias: true }); //设置抗锯齿
    renderer.setSize(canvas.value.clientWidth, canvas.value.clientHeight); //渲染的尺寸大小
    const renderTarget = new THREE.WebGLRenderTarget(512, 512);

    const geometry = new THREE.BoxGeometry(1, 1, 1);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 2, 0.1, 5);
    camera.position.z = 2;

    const material = new THREE.MeshPhongMaterial({ map: renderTarget.texture });

    const mesh = new THREE.Mesh(geometry, material);
    {
        // 第一个大场景特有添加的东西
        const light = new THREE.DirectionalLight(0xffffff, 1);
        light.position.set(-1, 2, 4);

        scene.add(mesh);
        scene.add(light);
    }

    const rtScene = new THREE.Scene();
    const rtCamera = new THREE.PerspectiveCamera(75, 1, 0.1, 5);
    rtCamera.position.z = 2;
    rtScene.background = new THREE.Color('red');

    const makeInstance = (color, x) => {
        const rtMaterial = new THREE.MeshPhongMaterial({ color });

        const rtMesh = new THREE.Mesh(geometry, rtMaterial);
        rtScene.add(rtMesh);
        rtMesh.position.x = x;

        return rtMesh;
    };

    const meshList = [makeInstance(0x44aa88, 0), makeInstance(0x8844aa, -2), makeInstance(0xaa8844, 2)];

    {
        // 小场景特有添加的东西
        const rtLight = new THREE.DirectionalLight(0xffffff, 1);
        rtLight.position.set(-1, 2, 4);

        rtScene.add(rtLight);
    }

    const resizeRendererToDisplaySize = (theRenderer) => {
        const newCanvas = theRenderer.domElement;
        const width = newCanvas.clientWidth;
        const height = newCanvas.clientHeight;
        const needResize = newCanvas.width !== width || newCanvas.height !== height;
        if (needResize) {
            theRenderer.setSize(width, height, false);
        }
        return needResize;
    };

    const animate = (time) => {
        time *= 0.001;
        if (resizeRendererToDisplaySize(renderer)) {
            camera.spect = canvas.value.clientWidth / canvas.value.clientHeight;
            camera.updateProjectionMatrix();
        }

        meshList.forEach((rtMesh, index) => {
            const speed = 1 + index * 0.1;
            const rot = time * speed;
            rtMesh.rotation.x = rot;
            rtMesh.rotation.y = rot;
        });

        renderer.setRenderTarget(renderTarget);
        renderer.render(rtScene, rtCamera);
        renderer.setRenderTarget(null);

        mesh.rotation.x = time;
        mesh.rotation.y = time * 1.1;

        renderer.render(scene, camera);
        requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
});
</script>
