<template>
    <div class="webgl-04-geometry public-absolute-full-container flex justify-center align-middle">
        <canvas ref="canvas" class="bg-black w-full h-full"></canvas>
    </div>
</template>
<script setup>
import * as THREE from 'three';
import { defineRouteMeta } from '@fesjs/fes';
import { onMounted, ref } from 'vue';

import { Base3d } from '../service';

defineRouteMeta({
    name: '04_geometry',
    title: '几何体操作',
});

const canvas = ref(null);

onMounted(() => {
    const threeD = new Base3d(canvas.value);
    const geometry = new THREE.OctahedronGeometry(70);

    const makeInstance = (color, y) => {
        const material = new THREE.MeshPhongMaterial({ color });

        const cube = new THREE.Mesh(geometry, material);
        threeD.scene.add(cube);
        cube.position.z = y;
        return cube;
    };
    const cubes = [makeInstance(0x44aa88, 200), makeInstance(0x8844aa, 0), makeInstance(0xaa8844, -200)];

    threeD.setDirectionalLight();

    let time = 1;
    const animate = () => {
        time += 0.001; // 将时间单位变为秒

        cubes.forEach((cube, ndx) => {
            const speed = 1 + ndx * 0.1;
            const rot = time * speed;
            cube.rotation.x = rot;
            cube.rotation.y = rot;
        });

        threeD.renderer.render(threeD.scene, threeD.camera);
        requestAnimationFrame(animate); //请求再次执行渲染函数render
    };

    animate();
});
</script>
