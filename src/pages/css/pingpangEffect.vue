<template>
    <div class="ping-pang-effect-container w-h-full flex-center-center" :style="{ backgroundColor: backgroundColor }">
        <div class="box">
            <div class="circle"></div>
        </div>
    </div>
</template>
<script setup>
import { defineRouteMeta } from '@fesjs/fes';
import { ref, onUnmounted } from 'vue';

defineRouteMeta({
    name: 'pingpangEffect',
    title: '类乒乓特效',
});
const backgroundColor = ref();
function changePageBG() {
    const randomFn = (range = 255) => Math.floor(Math.random() * range);

    const red = randomFn();
    const green = randomFn();
    const blue = randomFn();

    backgroundColor.value = `rgb(${red} ${green} ${blue})`;
}
const intervalId = setInterval(changePageBG, 1000);
onUnmounted(() => {
    clearInterval(intervalId);
});
</script>
<style lang="less" scoped>
.ping-pang-effect-container {
    background-color: #222;
    overflow: hidden;
    @keyframes animateBox {
        0%,
        100% {
            transform: rotate(0deg);
        }

        50% {
            transform: rotate(90deg);
        }
    }

    @keyframes animateBall {
        0%,
        100% {
            transform: rotate(135deg);
        }

        50% {
            transform: rotate(-45deg);
        }
    }
    .box {
        position: relative;
        width: 400px;
        height: 400px;
        border: 80px solid transparent;
        border-right-color: #fff5;
        border-bottom-color: #fff5;
        border-radius: 50%;

        transform: rotate(45deg);
        animation: animateBox 2s linear infinite;
        &::before {
            content: '';
            width: 80px;
            height: 40px;
            background-color: #fff;
            border-radius: 50%;
            transform: rotate(-45deg);
            position: absolute;
            top: 212px;
            left: -34px;
        }

        &::after {
            content: '';
            width: 80px;
            height: 40px;
            background-color: #fff;
            border-radius: 50%;
            transform: rotate(-45deg);
            position: absolute;
            bottom: 212px;
            right: -34px;
        }

        .circle {
            width: 70px;
            height: 70px;
            background-color: #fff;
            border-radius: 50%;
            box-shadow: inset 0px 5px 20px rgba(0, 0, 0, 0.5);
            transform-origin: 200px;
            animation: animateBall 2s linear infinite;
            position: absolute;
            z-index: 10;
            top: 65px;
            left: -95px;
        }
    }
}
</style>
