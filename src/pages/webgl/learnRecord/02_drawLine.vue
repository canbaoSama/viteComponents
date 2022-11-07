<template>
    <div class="webgl-02-drawLine public-absolute-full-container flex justify-center align-middle">
        <canvas ref="canvas" class="bg-black w-full h-full"></canvas>
    </div>
</template>
<script setup>
import * as THREE from 'three';
import { defineRouteMeta } from '@fesjs/fes';
import { onMounted, ref } from 'vue';

import { renderWebgl } from '../service';

defineRouteMeta({
    name: '02_drawLine',
    title: 'webgl 画线',
});

const canvas = ref(null);

onMounted(() => {
    const scene = new THREE.Scene();

    const point = new THREE.PointLight(0xffffff);
    point.position.set(200, 200, 100); //点光源位置
    scene.add(point); //点光源添加到场景中

    const width = canvas.value.clientWidth; //canvas宽度
    const height = canvas.value.clientHeight; //canvas高度
    const k = width / height; //窗口宽高比
    const s = 100; //三维场景显示范围控制系数，系数越大，显示的范围越大

    const camera = new THREE.OrthographicCamera(-s * k, s * k, s, -s, 1, 1000); //创建相机对象
    camera.position.set(200, 300, 200); //设置相机位置
    camera.lookAt(scene.position); //设置相机方向(指向的场景对象)

    const material = new THREE.LineBasicMaterial({ color: 0x0000ff });

    const points = [];
    points.push(new THREE.Vector3(-100, 0, 0));
    points.push(new THREE.Vector3(0, 100, 0));
    points.push(new THREE.Vector3(100, 0, 0));

    const geometry = new THREE.BufferGeometry().setFromPoints(points);

    const line = new THREE.Line(geometry, material);
    scene.add(line);

    // 建立坐标轴
    const axisHelper = new THREE.AxesHelper(200);
    scene.add(axisHelper);

    // 创建渲染器对象
    const renderer = new THREE.WebGLRenderer({ canvas: canvas.value, context: canvas.value.getContext('webgl2') });
    renderer.setSize(width, height); //设置渲染区域尺寸
    renderer.setClearColor(0xb9d3ff, 1); //设置背景颜色

    //执行渲染操作  指定场景、相机作为参数
    renderWebgl(camera, renderer, canvas);
});
</script>
