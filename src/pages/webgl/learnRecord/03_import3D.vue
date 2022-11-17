<template>
    <div class="webgl-02-drawLine public-absolute-full-container flex justify-center align-middle">
        <canvas ref="canvas" class="bg-black w-full h-full"></canvas>
    </div>
</template>
<script setup>
import { defineRouteMeta } from '@fesjs/fes';
import { onMounted, ref } from 'vue';

import * as THREE from 'three'; //导入整个 three.js核心库

import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'; //导入GLTF模块，模型解析器,根据文件格式来定
import Stats from 'three/examples/jsm/libs/stats.module';

import base3D from '../base3D';

defineRouteMeta({
    name: '03_import3D',
    title: 'webgl 导入3D模型',
});

const canvas = ref(null);

onMounted(async () => {
    const threeD = new base3D(canvas.value);

    const geometry = new THREE.PlaneGeometry(500, 500);
    const material = new THREE.MeshPhongMaterial({ color: 0x999999, depthWrite: false });

    const ground = new THREE.Mesh(geometry, material);
    ground.position.set(0, -5, 0);
    ground.rotation.x = -Math.PI / 2;
    ground.receiveShadow = true;
    threeD.scene.add(ground);

    const grid = new THREE.GridHelper(500, 100, 0x000000, 0x000000);
    grid.position.y = -5;
    grid.material.opacity = 0.2;
    grid.material.transparent = true;
    threeD.scene.add(grid);

    threeD.setPointLight();
    threeD.setAmbientLight();

    const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444, 0.6);
    hemiLight.position.set(0, 200, 0);
    threeD.scene.add(hemiLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 0.8);
    dirLight.position.set(0, 20, 10);
    dirLight.castShadow = true;
    dirLight.shadow.camera.top = 18;
    dirLight.shadow.camera.bottom = -10;
    dirLight.shadow.camera.left = -12;
    dirLight.shadow.camera.right = 12;
    threeD.scene.add(dirLight);

    let mixer;
    const stats = new Stats();
    const clock = new THREE.Clock();

    const animate = () => {
        requestAnimationFrame(animate);

        if (mixer) mixer.update(clock.getDelta());

        threeD.renderer.render(threeD.scene, threeD.camera);
        stats.update();
    };

    const loader = new GLTFLoader().setPath('http://127.0.0.1:5500/public/files/gltf/');
    loader.load(
        'SimpleSkinning.gltf',
        (gltf) => {
            threeD.scene.add(gltf.scene);
            gltf.scene.traverse((child) => {
                if (child.isSkinnedMesh) child.castShadow = true;
            });

            mixer = new THREE.AnimationMixer(gltf.scene);
            mixer.clipAction(gltf.animations[0]).play();
        },
        (xhr) => {
            console.log(`${(xhr.loaded / xhr.total) * 100}% loaded`);
            animate();
        },
        (err) => {
            console.log(err);
        },
    );

    threeD.renderer.setPixelRatio(window.devicePixelRatio);
    threeD.renderer.setSize(window.innerWidth, window.innerHeight);
    threeD.renderer.shadowMap.enabled = true;

    threeD.container.appendChild(stats.dom);

    threeD.controls.enablePan = false;
    threeD.controls.minDistance = 5;
    threeD.controls.maxDistance = 50;
});
</script>
