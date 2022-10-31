<template>
    <div class="webgl-01-start flex justify-center align-middle">
        <canvas ref="canvas" class="bg-black w-full h-full"></canvas>
    </div>
</template>
<script setup>
import * as THREE from 'three';
import { defineRouteMeta } from '@fesjs/fes';
import { onMounted, ref } from 'vue';

import { renderWebgl } from '../service';

defineRouteMeta({
    name: '01_start',
    title: 'webgl 开始',
});

const canvas = ref(null);

onMounted(() => {
    // 场景等基本网格模型
    const scene = new THREE.Scene(); // 创建场景对象Scene
    const geometry = new THREE.BoxGeometry(100, 100, 100); //创建一个立方体几何对象Geometry
    const material = new THREE.MeshLambertMaterial({ color: 0x0000ff }); //材质对象Material
    const mesh = new THREE.Mesh(geometry, material); //网格模型对象Mesh
    mesh.position.set(0, 50, 0); // 和之前的xyz模型的对比是y z x
    scene.add(mesh);

    // 点光源
    const point = new THREE.PointLight(0xffffff);
    point.position.set(200, 200, 100); //点光源位置
    scene.add(point); //点光源添加到场景中

    // 环境光
    const ambient = new THREE.AmbientLight(0x444444);
    scene.add(ambient);

    // 相机设置
    const width = canvas.value.clientWidth; //canvas宽度
    const height = canvas.value.clientWidth; //canvas高度
    const k = width / height; //窗口宽高比
    const s = 200; //三维场景显示范围控制系数，系数越大，显示的范围越大
    const camera = new THREE.OrthographicCamera(-s * k, s * k, s, -s, 1, 1000); //创建相机对象
    camera.position.set(200, 300, 200); //设置相机位置
    camera.lookAt(scene.position); //设置相机方向(指向的场景对象)

    // 创建渲染器对象
    const renderer = new THREE.WebGLRenderer({ canvas: canvas.value, context: canvas.value.getContext('webgl2') });
    renderer.setSize(width, height); //设置渲染区域尺寸
    renderer.setClearColor(0xb9d3ff, 1); //设置背景颜色

    const animate = () => {
        renderer.render(scene, camera);
        requestAnimationFrame(animate); //请求再次执行渲染函数render
    };

    //执行渲染操作  指定场景、相机作为参数
    renderWebgl(camera, renderer, canvas, animate);
});
</script>
