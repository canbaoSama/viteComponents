<template>
    <div class="infinite-scroll-container w-h-full flex-center-center">
        <div
            v-for="(speed, index) in speedList"
            :key="speed"
            class="scroll"
            :class="index === speedList.length - 1 && 'img-box'"
            :style="{ '--t': `${speed}s` }"
        >
            <div>
                <span
                    v-for="(text, innerIdx) in textList"
                    :key="text"
                    :class="index === speedList.length - 1 && 'bg'"
                    :style="index === speedList.length - 1 ? { '--r': innerIdx * 40 } : {}"
                    >{{ text }}
                </span>
            </div>
            <div>
                <span
                    v-for="(text, innerIdx) in textList"
                    :key="text"
                    :class="index === speedList.length - 1 && 'bg'"
                    :style="index === speedList.length - 1 ? { '--r': innerIdx * 40 } : {}"
                    >{{ text }}
                </span>
            </div>
        </div>
    </div>
</template>
<script setup>
import { defineRouteMeta } from '@fesjs/fes';

defineRouteMeta({
    name: 'infiniteScroll',
    title: '无线滚动播放',
});
const textList = ['HTML', 'CSS', 'JavaScript', 'Vue', 'React', 'Figma', 'Photoshop'];
const speedList = [20, 30, 10, 35, 25];
</script>
<style lang="less" scoped>
.infinite-scroll-container {
    background-color: #222;
    flex-direction: column;

    @keyframes animate {
        0% {
            transform: translateX(100%);
        }

        100% {
            transform: translateX(-100%);
        }
    }

    @keyframes animate2 {
        0% {
            transform: translateX(0);
        }

        100% {
            transform: translateX(-200%);
        }
    }
    .scroll {
        position: relative;
        display: flex;
        width: 700px;
        overflow: hidden;
        mask-image: linear-gradient(90deg, transparent, #fff 20%, #fff 80%, transparent);
        -webkit-mask-image: linear-gradient(90deg, transparent, #fff 20%, #fff 80%, transparent);

        & > div span {
            display: inline-block;
            margin: 10px;
            padding: 5px 10px;
            background-color: #333;
            border-radius: 5px;
            letter-spacing: 0.2em;
            text-transform: uppercase;
            cursor: pointer;
            transition: background-color 0.5s;
            &:hover {
                background-color: #4caf50;
            }
        }
        &.img-box {
            display: flex;
            column-gap: 10px;
            & > div,
            & > div .bg {
                display: flex;
                justify-content: center;
                align-items: center;
                gap: 10px;
            }
            & .bg {
                width: 150px;
                height: 150px;
                background-color: #ff3e3e;
                filter: hue-rotate(calc(var(--r) * 1deg));
                cursor: pointer;
                transition: filter 0.5s;
            }
        }
        & > div {
            white-space: nowrap;
            animation: animate var(--t) linear infinite;
            animation-delay: calc(var(--t) * -1);
        }
        & > div:nth-child(2) {
            animation: animate2 var(--t) linear infinite;
            animation-delay: calc(var(--t) / -2);
        }

        &:hover > div {
            animation-play-state: paused;
        }
    }
}
</style>
