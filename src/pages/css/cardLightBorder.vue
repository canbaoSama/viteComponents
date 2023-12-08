<template>
    <div class="card-light-border-container flex-center-center">
        <div class="content flex-center-center">
            <div
                v-for="(clr, index) in clrList"
                :key="clr.key"
                class="card"
                :style="{ '--clr': clr.key, '--x': `${clr['--x']}px`, '--y': `${clr['--y']}px` }"
                @mousemove="(event) => mousemove(event, index)"
            ></div>
        </div>
    </div>
</template>
<script setup>
import { defineRouteMeta } from '@fesjs/fes';
import { ref } from 'vue';

defineRouteMeta({
    name: 'cardLightBorder',
    title: '卡片发光边角框',
});
const clrList = ref([
    {
        key: '#f00',
        '--x': 0,
        '--y': 0,
    },
    {
        key: '#0f0',
        '--x': 0,
        '--y': 0,
    },
    {
        key: '#0fe',
        '--x': 0,
        '--y': 0,
    },
    {
        key: '#ff0',
        '--x': 0,
        '--y': 0,
    },
]);

function mousemove(event, index) {
    clrList.value[index]['--x'] = `${event.offsetX}`;
    clrList.value[index]['--y'] = `${event.offsetY}`;
}
</script>
<style lang="less" scoped>
.card-light-border-container {
    min-height: 100vh;
    background-color: #222;
    display: flex;
    justify-content: center;
    align-items: center;
    .content {
        width: 660px;
        height: 660px;
        flex-wrap: wrap;
        gap: 50px;

        .card {
            width: 300px;
            height: 300px;
            background-color: rgba(45, 45, 45, 1);
            border-radius: 20px;
            overflow: hidden;
            position: relative;

            &::before {
                content: '';
                position: absolute;
                left: var(--x);
                top: var(--y);
                transform: translate(-50%, -50%);

                width: 600px;
                height: 600px;
                background: radial-gradient(var(--clr), transparent, transparent);
                opacity: 0;
                transition: opacity 0.5s;
            }

            &:hover::before {
                opacity: 1;
            }

            &::after {
                content: '';
                position: absolute;
                inset: 2px;
                border-radius: 18px;
                background-color: rgba(45, 45, 45, 0.75);
            }
        }
    }
}
</style>
