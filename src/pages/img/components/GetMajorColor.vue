<template>
    <UploadImgShow v-model="src" />
    <div class="loading-img"><img ref="imgRef" :src="src" class="img-test" @load="imgLoaded" /></div>
    <div :style="{ background: color }" class="show-color">
        <span>{{ `图片主色: ${color}` }}</span>
        <a-button type="primary" class="ml-20" @click="copyText(color)">复制</a-button>
    </div>
</template>
<script setup>
import { ref } from 'vue';
import { copyText } from '@/common/utils';
import UploadImgShow from './UploadImgShow.vue';

const imgRef = ref();
const src = ref('src/images/3.jpg');
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
.source-img {
    max-width: 500px;
}
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
    border: 2px dashed #000;
}
.upload-img {
    margin-top: 24px;
    .upload-content {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        justify-content: center;
        .upload-title {
            margin-top: 4px;
        }
    }
}
</style>
