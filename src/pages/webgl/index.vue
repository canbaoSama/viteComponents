<template>
    <div class="flex justify-center align-middle">
        <canvas ref="canvas" class="bg-black w-full h-full"></canvas>
    </div>
</template>
<script setup>
import { ref, onMounted } from 'vue';
import { defineRouteMeta } from '@fesjs/fes';

import { Base3d } from './service';
import { dottedCheckerBoard } from './template/myGround';

defineRouteMeta({
    name: 'webgl',
    title: 'webgl 功能',
});

const canvas = ref(null);
onMounted(() => {
    const threeD = new Base3d(canvas.value);
    dottedCheckerBoard(threeD);

    const animate = () => {
        threeD.renderer.render(threeD.scene, threeD.camera);
        requestAnimationFrame(animate); //请求再次执行渲染函数render
    };

    animate();
});
</script>

<style scoped></style>
