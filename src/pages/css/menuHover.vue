<template>
    <div class="menu-hover-container" @mousemove="mousemove">
        <ul ref="ulRef">
            <li>Home</li>
            <li>About</li>
            <li>Creative Menu Hover Effects</li>
            <li>Services</li>
            <li>Portfolio</li>
            <li>Contact</li>
            <div id="cursor" ref="cursorRef"></div>
        </ul>
    </div>
</template>
<script setup>
import { defineRouteMeta } from '@fesjs/fes';
import { onMounted, ref } from 'vue';

defineRouteMeta({
    name: 'menuHover',
    title: '菜单导航悬浮交互',
});
const ulRef = ref();
const cursorRef = ref();
onMounted(() => {
    ulRef.value.querySelectorAll('li').forEach((textEle) => {
        const textList = textEle.innerText.split('');
        textEle.innerHTML = textList.map((letter, i) => `<span style="transition-delay: ${i * 40}ms">${letter}</span>`).join('');
    });
});
function mousemove(e) {
    if (e) {
        cursorRef.value.style.left = `${e.pageX}px`;
        cursorRef.value.style.top = `${e.pageY}px`;
    }
}
</script>
<style lang="less">
.menu-hover-container {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    background-color: #222;
    cursor: none;

    ul {
        display: grid;
        row-gap: 10px;
        justify-items: center;

        li {
            list-style: none;
            text-align: center;
            color: #555;

            span {
                font-size: 2em;
                letter-spacing: 0.05em;
                transition: 0.25s;
                text-transform: uppercase;
            }
            &:hover span {
                color: #fff;
                text-shadow: 0 0 5px #fff, 0 0 15px #fff, 0 0 30px #fff, 0 0 60px #fff, 0 0 100px #fff;
            }
        }
    }

    #cursor {
        position: fixed;
        transform: translate(-50%, -50%);
        width: 20px;
        height: 20px;
        background-color: #fff;
        border-radius: 50%;
        box-shadow: 0 0 5px #fff, 0 0 15px #fff, 0 0 30px #fff, 0 0 60px #fff;
        pointer-events: none;
        opacity: 0;
        transition: opacity 0.5s;
    }
    &:hover #cursor {
        opacity: 1;
    }
}
</style>
