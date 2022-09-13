<template>
    <div class="loading-img">
        <a-button ref="imgRef" type="primary">点击</a-button>
        <img ref="imgRef" src="@/images/1.png" />
    </div>
</template>
<script setup>
import { defineRouteMeta } from '@fesjs/fes';
import { onMounted, ref } from 'vue';
import ColorThief from 'colorthief';

defineRouteMeta({
    name: 'imgLoading',
    title: '图片加载',
});

const imgRef = ref();
const colorthief = new ColorThief();
onMounted(() => {
    const color = colorthief.getPalette(imgRef.value);
    console.log(color);
});
</script>
