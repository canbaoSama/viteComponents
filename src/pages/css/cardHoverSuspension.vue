<template>
    <div class="w-h-full card-hover-container flex-center-center">
        <div v-for="index in 9" :key="index" class="card" :style="{ '--i': index - 5 }">{{ index }}</div>
    </div>
</template>
<script setup>
import { defineRouteMeta } from '@fesjs/fes';

defineRouteMeta({
    name: 'cardHoverSuspension',
    title: '卡片悬浮',
});
</script>
<style lang="less" scoped>
.card-hover-container {
    background-color: #0f0f0f;
    color: #ccc;
    overflow-x: hidden;
    position: relative;

    &:active .card {
        background-color: #333;
    }
    .card {
        position: absolute;
        width: 240px;
        height: 320px;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #5e5cfc;
        filter: hue-rotate(calc(var(--i) * 50deg));
        border: 10px solid rgba(0, 0, 0, 0.1);
        border-radius: 8px;
        box-shadow: 0 15px 50px rgba(0, 0, 0, 0.1);
        font-size: 120px;
        font-weight: 700;
        transition: 0.5s;
        cursor: pointer;
        user-select: none;

        &:active {
            background-color: #5e5cfc;
            translate: calc(var(--i) * 20px) -50px;
            z-index: 100;
        }
    }

    &:hover .card {
        color: rgba(0, 0, 0, 0.25);
        box-shadow: 0 15px 50px rgba(0, 0, 0, 0.25);
        transform: rotate(calc(var(--i) * 5deg)) translate(calc(var(--i) * 120px), -50px);
    }
}
</style>
