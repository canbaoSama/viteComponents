<template>
    <div class="operator-btns">
        <a-radio-group v-model:value="radioValue" size="large" button-style="solid">
            <a-radio-button value="multiColumn">多列布局</a-radio-button>
            <a-radio-button value="waterfall">瀑布布局</a-radio-button>
        </a-radio-group>
    </div>
    <div v-if="radioValue === 'multiColumn'" class="public-multi-column">
        <div v-for="item in imgList" :key="item" class="item"><img :src="item" alt="" /></div>
    </div>
    <div v-if="radioValue === 'waterfall'" class="public-waterfall">
        <div v-for="item in imgList" :key="item" class="item"><img :src="item" alt="" /></div>
    </div>
</template>

<script setup>
import { defineRouteMeta } from '@fesjs/fes';
import { ref } from 'vue';

defineRouteMeta({
    name: 'index',
    title: '首页',
});

const radioValue = ref('multiColumn');
const imgList = [
    'https://img2.baidu.com/it/u=2335637867,3697443124&fm=253&fmt=auto&app=138&f=JPG?w=864&h=335',
    'https://img2.baidu.com/it/u=2335637867,3697443124&fm=253&fmt=auto&app=138&f=JPG?w=864&h=335',
    'https://img1.baidu.com/it/u=3987763978,3918181987&fm=253&fmt=auto&app=138&f=JPEG?w=600&h=344',
    'https://img2.baidu.com/it/u=3180787673,2876511483&fm=253&fmt=auto&app=138&f=PNG?w=500&h=201',
    'https://img1.baidu.com/it/u=2219546896,1207324069&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=914',
    'https://img2.baidu.com/it/u=62785874,714397132&fm=253&fmt=auto&app=138&f=JPEG?w=400&h=2000',
    'https://img1.baidu.com/it/u=1438507223,3158825307&fm=253&fmt=auto?w=448&h=499',
    'https://img0.baidu.com/it/u=1411351938,2168146477&fm=253&fmt=auto?w=500&h=280',
    'https://img2.baidu.com/it/u=3034226464,3392689819&fm=253&fmt=auto?w=382&h=652',
    'https://img1.baidu.com/it/u=1347941211,1891338127&fm=253&fmt=auto?w=500&h=184',
    'https://img0.baidu.com/it/u=3009506839,4103157977&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=763',
    'https://img0.baidu.com/it/u=3133536309,760067492&fm=253&fmt=auto?w=92&h=69',
];
</script>
<style lang="less" scoped>
.operator-btns {
    margin-bottom: 24px;
    text-align: center;
}
</style>
