<template>
    <div class="img-page">
        <img src="@/images/3.jpg" width="500" />
        <div class="loading-img"><img ref="imgRef" src="@/images/3.jpg" class="img-test" @load="imgLoaded" /></div>
        <div :style="{ background: color }" class="show-color">{{ `图片主色: ${color}` }}</div>
    </div>
</template>
<script setup>
import { defineRouteMeta } from '@fesjs/fes';
import { ref } from 'vue';

defineRouteMeta({
    name: 'getMajor',
    title: '获取图片主色',
});

const imgRef = ref();
const color = ref('#fff');
const imgLoaded = () => {
    const canvas = new OffscreenCanvas(1, 1);
    const ctx = canvas.getContext('2d');
    ctx.drawImage(imgRef.value, 0, 0, 1, 1);
    const { data } = ctx.getImageData(0, 0, 1, 1);
    color.value = `rgba(${data.join(',')})`;
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
.show-color {
    width: 500px;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #000;
    font-size: 18px;
    font-weight: bold;
}
</style>
