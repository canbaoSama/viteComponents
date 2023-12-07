<template>
    <div class="fruit-carousel-container">
        <header>
            <div>YOON</div>
            <nav>
                <ul>
                    <li>HOME</li>
                    <li>CONTACT</li>
                    <li>INFO</li>
                </ul>
            </nav>
        </header>

        <div ref="carouselRef" class="carousel">
            <div class="list">
                <div class="item active" style="--backgd: #ea3d41">
                    <div class="f-name">strawberry</div>
                    <img class="f-img" src="src/images/cssPage/fruit_strawberry.png" alt="fruit_strawberry" />
                </div>

                <div class="item" style="--backgd: #e7a043">
                    <div class="f-name">orange</div>
                    <img class="f-img" src="src/images/cssPage/fruit_orange.png" alt="fruit_orange" />
                </div>

                <div class="item" style="--backgd: #2d5643">
                    <div class="f-name">avocado</div>
                    <img class="f-img" src="src/images/cssPage/fruit_avocado.png" alt="fruit_avocado" />
                </div>
            </div>

            <div class="leaves"></div>
            <div class="mockup" :style="{ '--left': mockupLeft }"></div>
            <div class="shadow"></div>

            <div class="arrows">
                <button id="prev" @click="prepStep">&lt;</button>
                <button id="next" @click="nextStep">&gt;</button>
            </div>
        </div>
    </div>
</template>
<script setup>
import { defineRouteMeta } from '@fesjs/fes';
import { onMounted, onUnmounted, ref } from 'vue';

defineRouteMeta({
    name: 'fruitCarousel',
    title: '水果风味的苏打水轮播',
});
let nextStep;
let active = 0;
let count = 0;
let leftMockup = 0;
let refreshInterval;
const mockupLeft = ref(0);
const carouselRef = ref();
let list;
let left_each_item;
function handlePlayCarousel() {
    const hiddenOld = carouselRef.value.querySelector('.item.hidden');
    if (hiddenOld) hiddenOld.classList.remove('hidden');

    const activeOld = carouselRef.value.querySelector('.item.active');
    activeOld.classList.remove('active');
    activeOld.classList.add('hidden');

    list[active].classList.add('active');

    mockupLeft.value = `${leftMockup}%`;

    clearInterval(refreshInterval);
    refreshInterval = setInterval(() => nextStep, 5000);
}
nextStep = () => {
    active = active >= count - 1 ? 0 : active + 1;
    leftMockup = leftMockup + left_each_item;
    carouselRef.value.classList.remove('right');
    handlePlayCarousel();
};

function prepStep() {
    active = active <= 0 ? count - 1 : active - 1;
    leftMockup = leftMockup - left_each_item;
    carouselRef.value.classList.add('right');
    handlePlayCarousel();
}
onMounted(() => {
    list = carouselRef.value.querySelectorAll('.carousel .list .item');
    count = list.length;
    left_each_item = 100 / (list.length - 1);
    refreshInterval = setInterval(() => nextStep, 5000);
});
onUnmounted(() => {
    clearInterval(refreshInterval);
});
</script>
<style lang="less" scoped>
.fruit-carousel-container {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    background-color: #222;
    flex-wrap: wrap;

    @keyframes toActive {
        from {
            top: 100%;
            opacity: 0;
        }
    }

    @keyframes toOut {
        from {
            top: 50%;
            opacity: 1;
        }
    }
    @keyframes toActivePrve {
        from {
            top: 0;
            opacity: 0;
        }
    }
    li {
        list-style: none;
    }

    header {
        width: 100%;
        height: 40px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 50px;
        font-size: large;
        font-weight: 500;
        position: relative;
        z-index: 1;
        ul {
            display: flex;
            column-gap: 20px;
            margin: 0;
        }
    }

    .carousel {
        width: 100%;
        height: 100%;
        overflow: hidden;
        position: relative;
        margin-top: calc(40px * -1);
        .list {
            width: 100%;
            height: 100%;
            .item {
                width: 100%;
                height: 100%;
                background-color: var(--backgd);
                position: absolute;
                top: 0;
                left: 0;
                overflow: hidden;
                display: none;
                .f-name {
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);

                    color: #eee;
                    text-transform: uppercase;
                    font-size: 12rem;
                    font-weight: bold;
                }
                img.f-img {
                    width: 90%;

                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    z-index: 15;
                    /* pointer-events: none; */
                }
                &.active {
                    display: block;
                    img.f-img {
                        animation: toActive 0.5s ease-in-out 1;
                    }
                    .f-name {
                        animation: toActive 0.8s ease-in-out 1;
                    }
                }

                &.hidden {
                    display: none;
                    pointer-events: none;
                    background-color: transparent;
                    z-index: 1;
                    img.f-img {
                        animation: toOut 0.8s ease-in-out 1;
                        top: -100%;
                        opacity: 0;
                    }
                    .f-name {
                        opacity: 0;
                    }
                }
            }
        }
        .arrows {
            #prev,
            #next {
                position: absolute;
                top: 50%;
                transform: translateY(-50%);
                width: 50px;
                height: 50px;
                background-color: #eee5;
                border-radius: 50%;
                border: 1px solid #eee9;
                color: #eee;
                font-size: x-large;

                cursor: pointer;
                z-index: 15;
            }
            #prev {
                left: 20px;
            }
            #next {
                right: 20px;
            }
        }

        .leaves {
            width: 170px;
            height: 170px;
            background: url(src/images/cssPage/leaves.png);
            background-size: 100%;

            position: absolute;
            top: calc((50% - (calc(673px / 1.5) / 1.7)));
            left: calc((50% + (calc(371px / 1.5) / 5)));
        }

        .mockup {
            --left: 0%;

            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);

            width: calc(371px / 1.5);
            height: calc(673px / 1.5);
            background: url(src/images/cssPage/mockup.png) 0 0 no-repeat, url(src/images/cssPage/list_soda.jpg) var(--left) 0;
            background-size: auto 100%;
            background-blend-mode: multiply;

            -webkit-mask-image: url(src/images/cssPage/mockup.png);
            -webkit-mask-repeat: no-repeat;
            -webkit-mask-size: auto 100%;
            transition: background 0.5s;
        }

        .shadow {
            width: calc(371px / 1.5);
            height: 100px;
            background: #0008;
            border-radius: 50%;

            position: absolute;
            top: calc((50% + (calc(673px / 1.5) / 2)));
            left: 50%;
            transform: translateX(-50%);
            filter: blur(20px);
        }

        &.right {
            .item.active img.f-img {
                animation: toActivePrve 0.5s ease-in-out 1;
            }
            .item.active .f-name {
                animation: toActivePrve 0.8s ease-in-out 1;
            }
            .item.hidden img.f-img {
                animation: toOut 0.8s ease-in-out 1;
                top: 100%;
                opacity: 0;
            }
        }
    }

    @media screen and (max-width: 768px) {
        .item .f-name {
            transform: translate(-50%, -50%) scale(0.5);
        }

        .item img.f-img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
    }
}
</style>
