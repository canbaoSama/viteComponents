<template>
    <div class="webgl-05-scenarios public-absolute-full-container flex justify-center align-middle">
        <canvas ref="canvas" class="bg-black w-full h-full"></canvas>
    </div>
</template>
<script setup>
import { defineRouteMeta } from '@fesjs/fes';
import { onMounted, ref } from 'vue';

import base3D from '../base3D';

defineRouteMeta({
    name: '05_scenarios',
    title: '场景图',
});

const canvas = ref(null);

onMounted(() => {
    const threeD = new base3D(canvas.value);

    const animate = () => {
        threeD.renderer.render(threeD.scene, threeD.camera);
        requestAnimationFrame(animate);
    };

    animate();
});
</script>
