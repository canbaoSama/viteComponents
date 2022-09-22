<template>
    <img ref="imgRef" src="@/images/webp/yasuo.webp" width="500" @load="loadedImg" />
    <canvas id="canvas" ref="canvasRef" />
    <a-button @click="clickLoad">点击</a-button>
    <img ref="newImgRef" :src="src" width="500" />
</template>
<script setup>
import cannyEdgeDetector from 'canny-edge-detector';
import { ref } from 'vue';
import Image from 'image-js';

const imgRef = ref();
const src = ref('');
const newImgRef = ref();

const loadedImg = () => {
    const canvasRef = document.getElementById('canvas');
    const grey = new Image(imgRef.value).grey();
    const newImg = cannyEdgeDetector(grey);
    src.value = newImg.toDataURL();
    canvasRef.width = imgRef.value.width;
    canvasRef.height = imgRef.value.height;
    const ctx = canvasRef.getContext('2d');
    ctx.drawImage(newImgRef.value, 0, 0, canvasRef.width, canvasRef.height);
};
const clickLoad = () => {
    loadedImg(imgRef.value);
};
</script>
<style lang="less"></style>
