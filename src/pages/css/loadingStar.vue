<template>
    <div class="w-h-full loading-star-container">
        <div class="stars">
            <span v-for="index in 12" :key="index" :style="{ '--i': index }">
                <i class="iconfont icon-xingxing"></i>
            </span>
        </div>
    </div>
</template>
<script setup>
import { defineRouteMeta } from '@fesjs/fes';

defineRouteMeta({
    name: 'loadingStar',
    title: '星星粒子加载状态',
});
</script>
<style lang="less">
.loading-star-container {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: black;

    @keyframes animateColor {
        0% {
            filter: hue-rotate(0);
        }
        100% {
            filter: hue-rotate(360deg);
        }
    }

    @keyframes rotateStar {
        0% {
            transform: rotate(0) scale(0);
        }

        50% {
            transform: rotate(180deg) scale(3);
        }

        100% {
            transform: rotate(360deg) scale(0);
        }
    }

    @keyframes rotateParticle {
        0% {
            scale: 1;
            opacity: 0;
            rotate: 0;
        }

        50% {
            scale: 1;
            opacity: 1;
            rotate: 180deg;
        }

        100% {
            scale: 0;
            opacity: 0;
            rotate: 360deg;
            filter: drop-shadow(-150px 0 #3cc2ff) drop-shadow(150px 0 #3cc2ff) drop-shadow(0 -150px #3cc2ff) drop-shadow(0 150px #3cc2ff);
        }
    }

    .stars {
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
        width: 300px;
        height: 300px;
        animation: animateColor 7.2s linear infinite;

        span {
            position: absolute;
            transform-origin: 150px;
            transform: translateX(-150px) rotate(calc(var(--i) * 30deg));
            filter: drop-shadow(0 0 5px #3cc2ff) drop-shadow(0 0 15px #3cc2ff) drop-shadow(0 0 30px #3cc2ff);

            &::before {
                content: '\2729';
                font-size: 18px;
                color: #131a1c;
                position: absolute;
                animation: rotateParticle 2.4s linear infinite;
                animation-delay: calc(var(--i) * -0.2s);
            }

            i {
                position: relative;
                display: block;
                color: #3cc2ff;
                animation: rotateStar 2.4s linear infinite;
                animation-delay: calc(var(--i) * -0.2s);
            }
            .iconfont {
                font-family: 'iconfont' !important;
                font-size: 24px;
                font-style: normal;
                -webkit-font-smoothing: antialiased;
            }
            .icon-xingxing:before {
                content: '\2729';
            }
        }
    }
}
</style>
