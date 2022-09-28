<template>
    <UploadImgShow v-model="src" />
    <div class="w-full"><img ref="imgRef" :src="src" class="w-0.25 h-0.25" @load="imgLoaded" /></div>
    <div
        :style="{ background: color }"
        class="w-125 h-12.5 mt-6 flex items-center justify-center text-black text-lg font-bold border-solid border-black border-0.5"
    >
        <span>{{ `图片主色: ${color}` }}</span>
        <a-button type="primary" class="ml-20" @click="copyText(color)">复制</a-button>
    </div>
</template>
<script setup>
import { ref } from 'vue';

import UploadImgShow from './UploadImgShow.vue';

import { copyText } from '@/common/utils';

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
