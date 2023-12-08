<template>
    <div class="flow-border-container">
        <div class="box">
            <h2>html</h2>
        </div>

        <div class="box">
            <h2>⚡</h2>
        </div>

        <div class="box">
            <h2>css</h2>
        </div>
    </div>
</template>
<script setup>
import { defineRouteMeta } from '@fesjs/fes';

defineRouteMeta({
    name: 'flowBorder',
    title: '流动边框',
});
</script>
<style lang="less" scoped>
@property --rotate {
    syntax: '<angle>';
    inherits: false;
    initial-value: 0deg;
}
@keyframes rotating {
    0% {
        --rotate: 0deg;
    }

    100% {
        --rotate: 360deg;
    }
}
.flow-border-container {
    min-height: 100vh;
    background-color: #25252b;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    gap: 100px;

    .box {
        position: relative;
        width: 300px;
        height: 300px;
        background: repeating-conic-gradient(from var(--rotate), #ff2770 0%, #ff2770 5%, transparent 5%, transparent 40%, #ff2770 50%);
        border-radius: 20px;
        filter: drop-shadow(0 15px 50px #000);
        animation: rotating 2s linear infinite;
        animation-play-state: paused;

        &:nth-child(1) {
            filter: drop-shadow(0 15px 50px #000) hue-rotate(225deg);
        }
        &:nth-child(3) {
            filter: drop-shadow(0 15px 50px #000) hue-rotate(310deg);
        }

        &::before {
            content: '';
            position: absolute;
            width: 100%;
            height: 100%;
            background: repeating-conic-gradient(from var(--rotate), #45f3ff 0%, #45f3ff 5%, transparent 5%, transparent 40%, #45f3ff 50%);
            border-radius: 20px;
            animation: rotating 2s linear infinite;
            animation-delay: -0.5s;
            animation-play-state: paused;
        }

        &:hover,
        &:hover::before {
            animation-play-state: running;
        }

        &::after {
            content: '';
            position: absolute;
            inset: 6px;
            border: 8px solid #25252b;
            border-radius: 15px;
            background-color: #2d2d39;
        }

        h2 {
            position: absolute;
            inset: 40px;
            z-index: 10;
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: rgba(0, 0, 0, 0.2);
            border-radius: 10px;
            color: #fff;
            font-size: 2.5em;
            font-weight: 500;
            text-transform: uppercase;
            box-shadow: inset 0 10px 20px rgba(0, 0, 0, 0.5);
            border-bottom: 2px solid rgba(255, 255, 255, 0.1);
        }
    }
}
</style>
