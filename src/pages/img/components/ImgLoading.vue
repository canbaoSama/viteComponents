<template>
    <div class="public-waterfall">
        <div v-for="(img, index) in imgList" :key="index" class="item">
            <img
                class="pre"
                :class="`${img.loaded ? 'loaded' : ''} ${img.hidden ? 'hidden' : ''}`"
                :src="img.pre"
                @transitionend="(e) => transitionend(index)"
            />
            <img class="next" :src="img.next" :class="img.loaded ? 'loaded' : ''" @load="(e) => loadedImg(index)" />
        </div>
    </div>
    <div class="public-footer-fix">
        <a-button type="primary" @click="reloadImg">重新加载</a-button>
    </div>
</template>
<script setup>
import { defineRouteMeta } from '@fesjs/fes';
import { ref } from 'vue';

defineRouteMeta({
    name: 'cwebpBin',
    title: 'cwebp加载替换',
});

const defaultImgList = [
    {
        pre: '/src/images/svg/1.svg',
        next: '/src/images/1.png',
        loaded: false,
        hidden: false,
    },
    {
        pre: '/src/images/webp/2.webp',
        next: '/src/images/2.png',
        loaded: false,
        hidden: false,
    },
    {
        pre: '/src/images/webp/3.webp',
        next: '/src/images/3.jpg',
        loaded: false,
        hidden: false,
    },
    {
        pre: '/src/images/svg/1.svg',
        next: '/src/images/1.png',
        loaded: false,
        hidden: false,
    },
    {
        pre: '/src/images/webp/3.webp',
        next: '/src/images/3.jpg',
        loaded: false,
        hidden: false,
    },
    {
        pre: '/src/images/webp/2.webp',
        next: '/src/images/2.png',
        loaded: false,
        hidden: false,
    },
    {
        pre: '/src/images/webp/3.webp',
        next: '/src/images/3.jpg',
        loaded: false,
        hidden: false,
    },
    {
        pre: '/src/images/webp/3.webp',
        next: '/src/images/3.jpg',
        loaded: false,
        hidden: false,
    },
];
const imgList = ref(JSON.parse(JSON.stringify(defaultImgList)));

const loadedImg = (index) => {
    imgList.value[index].loaded = true;
};
// 动画完成
const transitionend = (index) => {
    imgList.value[index].hidden = true;
};

const reloadImg = () => {
    imgList.value = [];
    setTimeout(() => {
        imgList.value = JSON.parse(JSON.stringify(defaultImgList));
    }, 1000);
};
</script>
<style lang="less" scoped>
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
</style>
