<template>
    <img ref="imgRef" src="@/images/webp/yasuo.webp" width="500" @load="loadedImg" />
    <canvas id="canvas" ref="canvasRef" />
    <a-button @click="loadedImg">点击</a-button>
</template>
<script setup>
import cannyEdgeDetector from 'canny-edge-detector';
import { ref } from 'vue';
import Image from 'image-js';

const imgRef = ref();
let imgDa;
const loadedImg = (img = imgDa) => {
    const canvasRef = document.getElementById('canvas');

    imgDa = img;
    const grey = new Image(img.target).grey();
    const newImg = cannyEdgeDetector(grey);
    canvasRef.width = newImg.width;
    canvasRef.height = newImg.height;
    const ctx = canvasRef.getContext('2d');
    ctx.putImageData(imgDa, 0, 0);
    const image = new Image();
    image.src = canvasRef.toDataURL();
    return image;
    // const imageUrl = canvasRef.toDataURL('image/jpeg', 1);
};
</script>
<style lang="less"></style>
