<template>
    <div class="webgl-07-camera public-absolute-full-container flex justify-center align-middle">
        <canvas ref="canvas" class="bg-black"></canvas>
    </div>
</template>
<script setup>
import * as THREE from 'three';
import { defineRouteMeta } from '@fesjs/fes';
import { onMounted, ref } from 'vue';

import { Base3d } from '../service';

defineRouteMeta({
    name: '07_camera',
    title: '摄像机',
});

const canvas = ref(null);

onMounted(() => {
    const threeD = new Base3d(canvas.value);

    const left = 0;
    const right = canvas.value.clientWidth; // default canvas size
    const top = 0;
    const bottom = canvas.value.clientHeight; // defautl canvas size
    const near = -1;
    const far = 1;
    const camera = new THREE.OrthographicCamera(left, right, top, bottom, near, far);
    camera.zoom = 1;

    const loader = new THREE.TextureLoader();
    const textures = [
        loader.load('src/images/3.jpg'),
        loader.load('src/images/1.png'),
        loader.load('src/images/2.png'),
        loader.load('src/images/3.jpg'),
        loader.load('src/images/1.png'),
        loader.load('src/images/2.png'),
    ];
    const planeSize = 256;
    const planeGeo = new THREE.PlaneGeometry(planeSize, planeSize);
    const planes = textures.map((texture) => {
        const planePivot = new THREE.Object3D();
        threeD.scene.add(planePivot);
        texture.magFilter = THREE.NearestFilter;
        const planeMat = new THREE.MeshBasicMaterial({
            map: texture,
            side: THREE.DoubleSide,
        });
        const mesh = new THREE.Mesh(planeGeo, planeMat);
        planePivot.add(mesh);
        // move plane so top left corner is origin
        mesh.position.set(planeSize / 2, planeSize / 2, 0);
        return planePivot;
    });

    function resizeRendererToDisplaySize() {
        const width = canvas.value.clientWidth;
        const height = canvas.value.clientHeight;
        const needResize = canvas.value.width !== width || canvas.value.height !== height;
        if (needResize) {
            threeD.renderer.setSize(width, height, false);
        }
        return needResize;
    }

    function animate(time) {
        time *= 0.001; // convert to seconds;

        if (resizeRendererToDisplaySize()) {
            camera.right = canvas.value.width;
            camera.bottom = canvas.value.height;
            camera.updateProjectionMatrix();
        }

        const distAcross = Math.max(20, canvas.value.width - planeSize);
        const distDown = Math.max(20, canvas.value.height - planeSize);

        // total distance to move across and back
        const xRange = distAcross * 2;
        const yRange = distDown * 2;
        const speed = 180;

        planes.forEach((plane, ndx) => {
            // compute a unique time for each plane
            const t = time * speed + ndx * 300;

            // get a value between 0 and range
            const xt = t % xRange;
            const yt = t % yRange;

            // set our position going forward if 0 to half of range
            // and backward if half of range to range
            const x = xt < distAcross ? xt : xRange - xt;
            const y = yt < distDown ? yt : yRange - yt;

            plane.position.set(x, y, 0);
        });

        threeD.renderer.render(threeD.scene, camera);
        requestAnimationFrame(animate);
    }

    //threeD.scene.background = new THREE.Color('black');

    animate();
});
</script>
