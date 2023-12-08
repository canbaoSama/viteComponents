<template>
    <div class="w-h-full diverging-light-spot-container">
        <div v-for="index in 4" :key="index" class="loader" :style="{ '--r': index }">
            <span v-for="innerIdx in 20" :key="innerIdx" :style="{ '--i': innerIdx }"></span>
        </div>
    </div>
</template>
<script setup>
import { defineRouteMeta } from '@fesjs/fes';

defineRouteMeta({
    name: 'divergingLightSpot',
    title: '发散光点',
});
</script>
<style lang="less" scoped>
.diverging-light-spot-container {
    background-color: #042104;
    filter: hue-rotate(90deg);
    display: flex;
    justify-content: center;
    align-items: center;

    @keyframes animate {
        0% {
            transform: translateX(200px) scale(1);
            opacity: 0;
        }

        10% {
            opacity: 1;
        }

        80% {
            opacity: 1;
        }

        100% {
            transform: translateX(0) scale(0);
            opacity: 1;
        }
    }

    .loader {
        position: relative;
        transform: rotate(calc(var(--r) * 45deg));
        span {
            position: absolute;
            top: 0;
            left: -200px;
            width: 200px;
            height: 2px;
            transform-origin: right;
            transform: rotate(calc(var(--i) * 18deg));
            &::before {
                content: '';
                display: block;

                width: 15px;
                height: 15px;
                background-color: #00ff0a;
                border-radius: 15px;
                box-shadow: 0 0 10px #00ff0a, 0 0 20px #00ff0a, 0 0 40px #00ff0a, 0 0 60px #00ff0a, 0 0 80px #00ff0a, 0 0 100px #00ff0a;

                animation: animate 5s linear infinite;
                animation-delay: calc(-0.5s * var(--i));
            }
        }
    }
}
</style>
