<template>
    <div class="webgl-06-texture public-absolute-full-container flex justify-center align-middle">
        <canvas ref="canvas" class="bg-black w-full h-full"></canvas>
    </div>
</template>
<script setup>
import * as THREE from 'three';
import { defineRouteMeta } from '@fesjs/fes';
import { onMounted, ref } from 'vue';

import { Base3d, animate } from '../service';

defineRouteMeta({
    name: '06_texture',
    title: '纹理贴图',
});

const canvas = ref(null);

onMounted(() => {
    const threeD = new Base3d(canvas.value);

    const geometry = new THREE.BoxGeometry(100, 100, 200);

    const geometry_2 = new THREE.BoxGeometry(10, 10, 10);

    const loadManager = new THREE.LoadingManager();

    const loader = new THREE.TextureLoader();
    const materials = [
        new THREE.MeshBasicMaterial({ map: loader.load('src/images/3.jpg') }),
        new THREE.MeshBasicMaterial({ map: loader.load('src/images/1.png') }),
        new THREE.MeshBasicMaterial({ map: loader.load('src/images/2.png') }),
        new THREE.MeshBasicMaterial({ map: loader.load('src/images/webp/yasuo.webp') }),
        new THREE.MeshBasicMaterial({ map: loader.load('src/images/3.jpg') }),
        new THREE.MeshBasicMaterial({ map: loader.load('src/images/3.jpg') }),
    ];

    const material_2 = new THREE.MeshBasicMaterial({ map: loader.load('src/images/texture.png') });

    loadManager.onLoad = () => {
        const mesh = new THREE.Mesh(geometry, materials);
        const mesh_2 = new THREE.Mesh(geometry_2, material_2);
        //mesh_2.position.set(200, 0, 0);
        //threeD.scene.add(mesh);
        threeD.scene.add(mesh_2);
        animate(threeD);
    };
    loadManager.onLoad();
});
</script>
