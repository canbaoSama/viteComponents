<template>
    <div class="webgl-06-texture public-absolute-full-container flex justify-center align-middle">
        <canvas ref="canvas" class="bg-black"></canvas>
    </div>
</template>
<script setup>
import * as THREE from 'three';
import { defineRouteMeta } from '@fesjs/fes';
import { onMounted, ref } from 'vue';
import { GUI } from 'lil-gui';

import { Base3d, animate, StringToNumberHelper, DegRadHelper } from '../service';

defineRouteMeta({
    name: '06_texture',
    title: '纹理贴图',
});

const canvas = ref(null);

onMounted(() => {
    const threeD = new Base3d(canvas.value);

    //const geometry = new THREE.BoxGeometry(100, 100, 200);

    const geometry_2 = new THREE.BoxGeometry(100, 100, 100);

    //const loadManager = new THREE.LoadingManager();

    const loader = new THREE.TextureLoader();
    // const materials = [
    //     new THREE.MeshBasicMaterial({ map: loader.load('src/images/3.jpg') }),
    //     new THREE.MeshBasicMaterial({ map: loader.load('src/images/1.png') }),
    //     new THREE.MeshBasicMaterial({ map: loader.load('src/images/2.png') }),
    //     new THREE.MeshBasicMaterial({ map: loader.load('src/images/webp/yasuo.webp') }),
    //     new THREE.MeshBasicMaterial({ map: loader.load('src/images/3.jpg') }),
    //     new THREE.MeshBasicMaterial({ map: loader.load('src/images/3.jpg') }),
    // ];

    const texture_2 = loader.load('src/images/texture.png');
    texture_2.minFilter = THREE.LinearFilter;
    texture_2.magFilter = THREE.NearestFilter;
    texture_2.wrapS = THREE.MirroredRepeatWrapping;
    texture_2.wrapT = THREE.MirroredRepeatWrapping;
    // texture_2.repeat.set(2, 2);
    // texture_2.offset.set(0, 0.25);

    texture_2.center.set(0.5, 0.5);
    texture_2.rotation = THREE.MathUtils.degToRad(45);

    const material_2 = new THREE.MeshBasicMaterial({ map: texture_2 });

    //const mesh = new THREE.Mesh(geometry, materials);
    const mesh_2 = new THREE.Mesh(geometry_2, material_2);
    //mesh_2.position.set(200, 0, 0);
    //threeD.scene.add(mesh);
    threeD.scene.add(mesh_2);

    const wrapModes = {
        ClampToEdgeWrapping: THREE.ClampToEdgeWrapping,
        RepeatWrapping: THREE.RepeatWrapping,
        MirroredRepeatWrapping: THREE.MirroredRepeatWrapping,
    };

    function updateTexture() {
        texture_2.needsUpdate = true;
    }

    const gui = new GUI();
    gui.add(new StringToNumberHelper(texture_2, 'wrapS'), 'value', wrapModes).name('texture.wrapS').onChange(updateTexture);
    gui.add(new StringToNumberHelper(texture_2, 'wrapT'), 'value', wrapModes).name('texture.wrapT').onChange(updateTexture);
    gui.add(texture_2.repeat, 'x', 0, 5, 0.01).name('texture.repeat.x');
    gui.add(texture_2.repeat, 'y', 0, 5, 0.01).name('texture.repeat.y');
    gui.add(texture_2.offset, 'x', -2, 2, 0.01).name('texture.offset.x');
    gui.add(texture_2.offset, 'y', -2, 2, 0.01).name('texture.offset.y');
    gui.add(texture_2.center, 'x', -0.5, 1.5, 0.01).name('texture.center.x');
    gui.add(texture_2.center, 'y', -0.5, 1.5, 0.01).name('texture.center.y');
    gui.add(new DegRadHelper(texture_2, 'rotation'), 'value', -360, 360).name('texture.rotation');

    animate(threeD);
});
</script>
