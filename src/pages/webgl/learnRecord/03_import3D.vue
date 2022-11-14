<template>
    <div class="webgl-02-drawLine public-absolute-full-container flex justify-center align-middle">
        <canvas ref="canvas" class="bg-black w-full h-full"></canvas>
    </div>
</template>
<script setup>
import * as THREE from 'three';
import { defineRouteMeta } from '@fesjs/fes';
import { onMounted, ref } from 'vue';

import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
// import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';

import { createWebgl } from '../service';

defineRouteMeta({
    name: '03_import3D',
    title: 'webgl 导入3D模型',
});

const canvas = ref(null);

onMounted(() => {
    const { scene, render } = createWebgl(canvas.value, { threeD: true });

    scene.position.set(0, -100, 0);

    // 点光源
    const point = new THREE.PointLight(0xffffff);
    point.position.set(100, 200, 50); //点光源位置
    scene.add(point); //点光源添加到场景中

    // 环境光
    const ambient = new THREE.AmbientLight(0x444444);
    scene.add(ambient);

    const loader = new GLTFLoader().setPath('http://127.0.0.1:5500/public/files/gltf/girl/');

    loader.load(
        'scene.gltf',
        (gltf) => {
            gltf.scene.children[0].scale.set(10, 10, 10);
            scene.add(gltf.scene.children[0]);
            render(scene);
        },
        (xhr) => {
            console.log(`${(xhr.loaded / xhr.total) * 100}% loaded`);
        },
        (err) => {
            console.log(err);
        },
    );
});
</script>
