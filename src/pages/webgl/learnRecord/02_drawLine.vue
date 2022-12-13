<template>
    <div class="webgl-02-drawLine public-absolute-full-container flex justify-center align-middle">
        <canvas ref="canvas" class="bg-black w-full h-full"></canvas>
    </div>
</template>
<script setup>
import * as THREE from 'three';
import { defineRouteMeta } from '@fesjs/fes';
import { onMounted, ref } from 'vue';

import { Base3d, animate } from '../service';

defineRouteMeta({
    name: '02_drawLine',
    title: 'webgl 画线',
});

const canvas = ref(null);

onMounted(() => {
    const threeD = new Base3d(canvas.value);

    const material_line = new THREE.LineBasicMaterial({ color: 0x0000ff });

    // 第一条线，三角形，加粗点
    const points = [];
    points.push(new THREE.Vector3(100, 0, 0));
    points.push(new THREE.Vector3(0, 150, 0));
    points.push(new THREE.Vector3(0, 0, 100));
    points.push(new THREE.Vector3(100, 0, 0));

    const geometry = new THREE.BufferGeometry().setFromPoints(points);

    const points_2 = [];
    points_2.push(new THREE.Vector3(0, 0, 0));
    points_2.push(new THREE.Vector3(150, 0, 150));
    const geometry_2 = new THREE.BufferGeometry().setFromPoints(points_2);

    const material_point = new THREE.PointsMaterial({ color: 0xff0000, size: 15.0 });
    const point = new THREE.Points(geometry, material_point);
    threeD.scene.add(point);

    // 第二条线
    const line = new THREE.Line(geometry, material_line);
    const line_2 = new THREE.Line(geometry_2, material_line);
    threeD.scene.add(line);
    threeD.scene.add(line_2);

    const texture = new THREE.TextureLoader().load('src/images/1.png');
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(4, 4);
    threeD.scene.add(texture);

    threeD.setAxisHelper();

    animate(threeD);
});
</script>
