<template>
    <div class="text-rain-container">
        <div class="content">
            <div ref="cloudRef" class="cloud">
                <!-- 雨滴将会在这里出现 -->
            </div>
        </div>
    </div>
</template>
<script setup>
import { defineRouteMeta } from '@fesjs/fes';
import { onUnmounted, ref } from 'vue';

defineRouteMeta({
    name: 'textRain',
    title: '文字模拟雨滴',
});

// 从生成的数组中随机取出一个字符
function randomText() {
    const texts = ['$', '钱', '暴富', '发财', 'money', '富', '豪'];
    const text = texts[Math.floor(Math.random() * texts.length)];

    return text;
}
const cloudRef = ref();
function rainEffect() {
    const textEle = document.createElement('div');

    textEle.innerText = randomText();
    textEle.classList.add('text');

    const left = Math.floor(Math.random() * 310);
    const size = Math.random() * 1.5;
    const duration = Math.random();
    const styleSheets = {
        left: `${left}px`,
        fontSize: `${0.5 + size}em`,
        animationDuration: `${1 + duration}s`,
    };
    Object.assign(textEle.style, styleSheets);

    cloudRef.value.appendChild(textEle);
    setTimeout(() => {
        cloudRef.value.removeChild(textEle);
    }, 2000);
}

// 每隔20ms创建一个雨滴元素
const setIntervalId = setInterval(() => rainEffect(), 20);

onUnmounted(() => {
    clearInterval(setIntervalId);
});
</script>
<style lang="less">
.text-rain-container {
    width: 100%;
    height: 100%;
    background-color: #181c1f;
    display: flex;
    align-items: center;
    justify-content: center;
    .content {
        width: 100%;
        height: 400px;
        display: flex;
        justify-content: center;
        border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        /* 添加一个从下往上线性渐变的镜像效果，增加视觉层次感 */
        -webkit-box-reflect: below 1px linear-gradient(transparent, transparent, transparent, transparent, #0005);

        .cloud {
            position: relative;
            top: 50px;
            z-index: 100;

            /* 横向云朵 */
            width: 320px;
            height: 100px;
            background-color: goldenrod;
            border-radius: 100px;

            /* drop-shadow函数将阴影效果应用于投影图像 */
            filter: drop-shadow(0 0 30px goldenrod);

            &::before {
                content: '';
                /* 左侧小云朵 */
                width: 110px;
                height: 110px;
                background-color: goldenrod;
                border-radius: 50%;
                position: absolute;
                top: -50px;
                left: 40px;

                /* 右侧大云朵 */
                box-shadow: 90px 0 0 30px gold;
            }

            .text {
                position: absolute;
                top: 40px;
                height: 20px;
                line-height: 20px;
                text-transform: uppercase;
                color: goldenrod;
                /* 为文字添加阴影，看上去发光，增加视觉效果 */
                text-shadow: 0 0 5px #ffffff, 0 0 15px #ffffff, 0 0 30px #ffffff;
                transform-origin: bottom;
                animation: animate 3s linear forwards;
            }
        }
    }

    @keyframes animate {
        0% {
            transform: translateX(0);
        }

        70% {
            transform: translateY(290px);
        }

        100% {
            transform: translateY(290px);
        }
    }
}
</style>
