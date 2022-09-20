<template>
    <div class="masonry">
        <div class="item">
            <img src="https://img2.baidu.com/it/u=2335637867,3697443124&fm=253&fmt=auto&app=138&f=JPG?w=864&h=335" alt="" />
        </div>
        <div class="item">
            <img src="https://img0.baidu.com/it/u=3724418260,2055483242&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500" alt="" />
        </div>
        <div class="item">
            <img src="https://img1.baidu.com/it/u=3987763978,3918181987&fm=253&fmt=auto&app=138&f=JPEG?w=600&h=344" alt="" />
        </div>
        <div class="item">
            <img src="https://img2.baidu.com/it/u=3180787673,2876511483&fm=253&fmt=auto&app=138&f=PNG?w=500&h=201" alt="" />
        </div>
        <div class="item">
            <img src="https://img1.baidu.com/it/u=2219546896,1207324069&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=914" alt="" />
        </div>
        <div class="item">
            <img src="https://img2.baidu.com/it/u=62785874,714397132&fm=253&fmt=auto&app=138&f=JPEG?w=400&h=2000" alt="" />
        </div>
        <div class="item">
            <img src="https://img1.baidu.com/it/u=1438507223,3158825307&fm=253&fmt=auto?w=448&h=499" alt="" />
        </div>
        <div class="item">
            <img src="https://img0.baidu.com/it/u=1411351938,2168146477&fm=253&fmt=auto?w=500&h=280" alt="" />
        </div>
        <div class="item">
            <img src="https://img2.baidu.com/it/u=3034226464,3392689819&fm=253&fmt=auto?w=382&h=652" alt="" />
        </div>
        <div class="item">
            <img src="https://img1.baidu.com/it/u=1347941211,1891338127&fm=253&fmt=auto?w=500&h=184" alt="" />
        </div>
        <div class="item">
            <img src="https://img0.baidu.com/it/u=3009506839,4103157977&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=763" alt="" />
        </div>
        <div class="item">
            <img src="https://img0.baidu.com/it/u=3133536309,760067492&fm=253&fmt=auto?w=92&h=69" alt="" />
        </div>
    </div>
</template>

<script setup>
import { defineRouteMeta } from '@fesjs/fes';

defineRouteMeta({
    name: 'index',
    title: '首页',
});
</script>
<style lang="less" scoped>
body {
    margin: 4px;
    font-family: Arial, Helvetica, sans-serif;
}

.masonry {
    column-count: 4;
    column-gap: 0;
}

.item {
    padding: 2px;
    position: relative;
    counter-increment: count;
}

.item img {
    display: block;
    width: 100%;
    height: auto;
}

.item::after {
    position: absolute;
    display: block;
    top: 2px;
    left: 2px;
    width: 24px;
    height: 24px;
    text-align: center;
    line-height: 24px;
    background-color: #000;
    color: #fff;
    content: counter(count);
}
</style>
