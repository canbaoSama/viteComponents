<template>
    <div class="webgl-01-start public-absolute-full-container flex justify-center align-middle">
        <canvas ref="canvas" class="bg-black w-full h-full"></canvas>
    </div>
</template>
<script setup>
import * as THREE from 'three';
import { defineRouteMeta } from '@fesjs/fes';
import { onMounted, ref } from 'vue';

import base3D from '../base3D';

defineRouteMeta({
    name: '01_start',
    title: 'webgl 开始',
});

const canvas = ref(null);

onMounted(() => {
    // const { scene, render } = createWebgl(canvas.value);
    // // 场景等基本网格模型
    // const geometry = new THREE.BoxGeometry(100, 100, 100); //创建一个立方体几何对象Geometry
    // const material = new THREE.MeshLambertMaterial({ color: 0x0000ff }); //材质对象Material
    // const mesh = new THREE.Mesh(geometry, material); //网格模型对象Mesh
    // mesh.position.set(0, 0, 0); // 和之前的xyz模型的对比是y z x
    // scene.add(mesh);
    // // 点光源
    // const point = new THREE.PointLight(0xffffff);
    // point.position.set(200, 200, 100); //点光源位置
    // scene.add(point); //点光源添加到场景中
    // // 环境光
    // const ambient = new THREE.AmbientLight(0x444444);
    // scene.add(ambient);
    // //执行渲染操作  指定场景、相机作为参数
    // render(scene);
    const threeD = new base3D(canvas.value);
    // 场景等基本网格模型
    const geometry = new THREE.BoxGeometry(100, 100, 100); //创建一个立方体几何对象Geometry
    const material = new THREE.MeshLambertMaterial({ color: 0x0000ff }); //材质对象Material
    const mesh = new THREE.Mesh(geometry, material); //网格模型对象Mesh
    mesh.position.set(0, 0, 0); // 和之前的xyz模型的对比是y z x
    threeD.scene.add(mesh);
    // 点光源
    const point = new THREE.PointLight(0xffffff);
    point.position.set(200, 200, 100); //点光源位置
    threeD.scene.add(point); //点光源添加到场景中
    // 环境光
    const ambient = new THREE.AmbientLight(0x444444);
    threeD.scene.add(ambient);

    threeD.setAxisHelper();

    const animate = () => {
        threeD.renderer.render(threeD.scene, threeD.camera);
        requestAnimationFrame(animate); //请求再次执行渲染函数render
    };

    animate();
});
</script>
