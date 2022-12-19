<template>
    <div class="webgl-05-scenarios public-absolute-full-container flex justify-center align-middle">
        <canvas ref="canvas" class="bg-black"></canvas>
    </div>
</template>
<script setup>
import { defineRouteMeta } from '@fesjs/fes';
import { onMounted, ref } from 'vue';
import { GUI } from 'lil-gui';
import * as THREE from 'three';

import { Base3d, AxisGridHelper } from '../service';

defineRouteMeta({
    name: '05_scenarios',
    title: '场景图',
});

const canvas = ref(null);

onMounted(() => {
    const threeD = new Base3d(canvas.value);

    // 要更新旋转角度的对象数组
    const objects = [];

    // 球体,多用
    const radius = 1;
    const widthSegments = 64;
    const heightSegments = 6;
    const sphereGeometry = new THREE.SphereGeometry(radius, widthSegments, heightSegments);

    const solarSystem = new THREE.Object3D();
    threeD.scene.add(solarSystem);
    objects.push(solarSystem);

    // 太阳
    const sunMaterial = new THREE.MeshPhongMaterial({ emissive: 0xffff00 });
    const sunMesh = new THREE.Mesh(sphereGeometry, sunMaterial);
    sunMesh.scale.set(5, 5, 5); // 扩大太阳的大小
    solarSystem.add(sunMesh);
    objects.push(sunMesh);

    const earthOrbit = new THREE.Object3D();
    earthOrbit.position.x = 10;
    solarSystem.add(earthOrbit);
    objects.push(earthOrbit);

    const earthMaterial = new THREE.MeshPhongMaterial({ color: 0x2233ff, emissive: 0x112244 });
    const earthMesh = new THREE.Mesh(sphereGeometry, earthMaterial);
    earthOrbit.add(earthMesh);
    objects.push(earthMesh);

    const moonOrbit = new THREE.Object3D();
    moonOrbit.position.x = 2;
    earthOrbit.add(moonOrbit);

    const moonMaterial = new THREE.MeshPhongMaterial({ color: 0x888888, emissive: 0x222222 });
    const moonMesh = new THREE.Mesh(sphereGeometry, moonMaterial);
    moonMesh.scale.set(0.5, 0.5, 0.5);
    moonOrbit.add(moonMesh);
    objects.push(moonMesh);

    const light = new THREE.PointLight(0xffffff, 3);
    threeD.scene.add(light);

    threeD.initCamera();
    threeD.camera.position.set(0, 50, 0);
    threeD.camera.up.set(0, 0, 1);
    threeD.camera.lookAt(0, 0, 0);

    const gui = new GUI();
    function makeAxisGrid(node, label, units) {
        const helper = new AxisGridHelper(node, units);
        gui.add(helper, 'visible').name(label);
    }

    makeAxisGrid(solarSystem, 'solarSystem', 25);
    makeAxisGrid(sunMesh, 'sunMesh');
    makeAxisGrid(earthOrbit, 'earthOrbit');
    makeAxisGrid(earthMesh, 'earthMesh');
    makeAxisGrid(moonOrbit, 'moonOrbit');
    makeAxisGrid(moonMesh, 'moonMesh');

    let time = 1;
    const animate = () => {
        time += 0.005;
        objects.forEach((obj) => {
            obj.rotation.y = time;
        });
        threeD.renderer.render(threeD.scene, threeD.camera);
        requestAnimationFrame(animate);
    };

    animate();
});
</script>
