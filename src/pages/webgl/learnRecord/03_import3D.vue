<template>
    <div ref="containerRef" class="webgl-03-import3D public-absolute-full-container flex justify-center align-middle">
        <canvas ref="canvas" class="bg-black w-full h-full"></canvas>
    </div>
</template>
<script setup>
import { defineRouteMeta } from '@fesjs/fes';
import { onMounted, ref } from 'vue';

import * as THREE from 'three'; //导入整个 three.js核心库

import Stats from 'three/examples/jsm/libs/stats.module';

import { Base3d } from '../service';

import { dottedCheckerBoard } from '../template/myGround';

defineRouteMeta({
    name: '03_import3D',
    title: 'webgl 导入3D模型',
});

const canvas = ref(null);
const containerRef = ref(null);

onMounted(async () => {
    const threeD = new Base3d(canvas.value);
    dottedCheckerBoard(threeD);

    let mixer;
    const stats = new Stats();
    const clock = new THREE.Clock();

    const animate = () => {
        requestAnimationFrame(animate);

        if (mixer) mixer.update(clock.getDelta());

        threeD.renderer.render(threeD.scene, threeD.camera);
        stats.update();
    };

    threeD
        .setGLTFLoader('SimpleSkinning.gltf', { controls: true })
        .then((gltf) => {
            threeD.scene.add(gltf.scene);
            gltf.scene.traverse((child) => {
                if (child.isSkinnedMesh) child.castShadow = true;
            });

            mixer = new THREE.AnimationMixer(gltf.scene);
            mixer.clipAction(gltf.animations[0]).play();
        })
        .then(() => {
            animate();
        });

    threeD.renderer.setPixelRatio(window.devicePixelRatio);
    threeD.renderer.shadowMap.enabled = true;

    threeD.container.appendChild(stats.dom);

    threeD.controls.enablePan = false;
    threeD.controls.minDistance = 5;
    threeD.controls.maxDistance = 50;
    stats.domElement.style.position = 'absolute'; //绝对坐标
    containerRef.value.appendChild(stats.dom);
});
</script>
