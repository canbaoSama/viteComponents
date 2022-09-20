<template>
    <div class="img-page">
        <div v-for="(img, index) in imgList" :key="index" class="img-container-list">
            <img class="pre" :class="`${loaded ? 'loaded' : ''} ${hidden ? 'hidden' : ''}`" :src="img.pre" @transitionend="transitionend" />
            <img class="next" :src="img.next" :class="loaded ? 'loaded' : ''" @load="loadedImg" />
        </div>
    </div>
</template>
<script setup>
import { defineRouteMeta } from '@fesjs/fes';
import { ref } from 'vue';

defineRouteMeta({
    name: 'cwebpBin',
    title: 'cwebp加载替换',
});

const imgList = [
    {
        pre: '/src/images/svg/1.svg',
        next: '/src/images/1.png',
    },
    {
        pre: '/src/images/webp/2.webp',
        next: '/src/images/2.png',
    },
    {
        pre: '/src/images/webp/3.webp',
        next: '/src/images/3.jpg',
    },
    {
        pre: '/src/images/icon.png',
        next: '/src/images/icon.png',
    },
    // {
    //     pre: '/src/images/svg/1.svg',
    //     next: '/src/images/1.png',
    // },
    // {
    //     pre: '/src/images/webp/3.webp',
    //     next: '/src/images/3.jpg',
    // },
    // {
    //     pre: '/src/images/icon.png',
    //     next: '/src/images/icon.png',
    // },
    // {
    //     pre: '/src/images/icon.png',
    //     next: '/src/images/icon.png',
    // },
    // {
    //     pre: '/src/images/webp/2.webp',
    //     next: '/src/images/2.png',
    // },
    // {
    //     pre: '/src/images/webp/3.webp',
    //     next: '/src/images/3.jpg',
    // },
    // {
    //     pre: '/src/images/webp/3.webp',
    //     next: '/src/images/3.jpg',
    // },
    // {
    //     pre: '/src/images/icon.png',
    //     next: '/src/images/icon.png',
    // },
];

const loaded = ref(false);
const hidden = ref(false);
const loadedImg = () => {
    loaded.value = true;
};
// 动画完成
const transitionend = () => {
    hidden.value = true;
};
</script>
<style lang="less" scoped>
.img-page {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    max-width: 780px;
    .img-container-list {
        position: relative;
        width: 49%;
        height: 250px;
        img {
            position: absolute;
            max-width: 100%;
            height: auto;
        }
        .pre {
            opacity: 1;
            filter: blur(10px);
            transition: filter 1s ease-in-out;
            &.loaded {
                filter: blur(0);
            }
        }
        .next {
            opacity: 0;
            transition: opacity 1s ease-in-out;
            &.loaded {
                opacity: 1;
            }
        }
        .hidden {
            opacity: 0;
        }
    }
}
</style>
