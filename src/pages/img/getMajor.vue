<template>
    <div class="img-page">
        <div class="loading-img"><img ref="imgRef" src="@/images/3.jpg" class="img-test" @load="imgLoaded" /></div>
        <a-button type="primary" @click="colorConsole">主色输出</a-button>
    </div>
</template>
<script setup>
import { defineRouteMeta } from '@fesjs/fes';
import { ref } from 'vue';

defineRouteMeta({
    name: 'getMajor',
    title: '获取图片颜色',
});

const imgRef = ref();
let color = '';
const imgLoaded = () => {
    const canvas = new OffscreenCanvas(1, 1);
    const ctx = canvas.getContext('2d');
    ctx.drawImage(imgRef.value, 0, 0, 1, 1);
    const { data } = ctx.getImageData(0, 0, 1, 1);
    color = `rgba(${data.join(',')})`;
    console.log(color);
};
const colorConsole = () => {
    console.log(color);
};
</script>
<style lang="less" scoped>
.loading-img {
    width: 100%;
    .img-test {
        width: 1px;
        height: 1px;
    }
}
</style>
