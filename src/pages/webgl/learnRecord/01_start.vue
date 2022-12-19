<template>
    <div class="webgl-01-start public-absolute-full-container flex justify-center align-middle">
        <canvas ref="canvas" class="bg-black"></canvas>
    </div>
</template>
<script setup>
import * as THREE from 'three';
import { defineRouteMeta } from '@fesjs/fes';
import { onMounted, ref } from 'vue';

import { Base3d, animate } from '../service';

defineRouteMeta({
    name: '01_start',
    title: 'webgl 开始',
});

const canvas = ref(null);

onMounted(() => {
    const threeD = new Base3d(canvas.value);
    // 场景等基本网格模型
    const geometry = new THREE.BoxGeometry(100, 100, 100); //创建一个立方体几何对象Geometry
    const material = new THREE.MeshLambertMaterial({ color: 0x0000ff }); //材质对象Material
    const mesh = new THREE.Mesh(geometry, material); //网格模型对象Mesh
    mesh.position.set(0, 0, 0); // 和之前的xyz模型的对比是y z x
    threeD.scene.add(mesh);

    threeD.setPointLight();
    threeD.setAmbientLight();
    threeD.setAxisHelper();

    animate(threeD);
});
</script>
