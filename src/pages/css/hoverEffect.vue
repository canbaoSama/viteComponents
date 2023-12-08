<template>
    <div class="hover-effect-container w-h-full flex-center-center">
        <ul>
            <li style="--clr: #2483ff">
                <a href="#">
                    <HomeOutlined class="icon" />
                    <span class="text">Home</span>
                </a>
            </li>

            <li style="--clr: #fff200">
                <a href="#">
                    <UserOutlined class="icon" />
                    <span class="text">User</span>
                </a>
            </li>

            <li style="--clr: #ff253f">
                <a href="#">
                    <HeartOutlined class="icon" />
                    <span class="text">Heart</span>
                </a>
            </li>

            <li style="--clr: #25d366">
                <a href="#">
                    <SettingOutlined class="icon" />
                    <span class="text">Setting</span>
                </a>
            </li>

            <li style="--clr: #f32ec8">
                <a href="#">
                    <SearchOutlined class="icon" />
                    <span class="text">Search</span>
                </a>
            </li>
        </ul>
    </div>
</template>
<script setup>
import { defineRouteMeta } from '@fesjs/fes';
import { HomeOutlined, UserOutlined, HeartOutlined, SettingOutlined, SearchOutlined } from '@ant-design/icons-vue';

defineRouteMeta({
    name: 'hoverEffect',
    title: '悬停效果',
});
</script>
<style lang="less" scoped>
:root {
    --bg: #222;
}

.hover-effect-container {
    min-height: 100vh;
    background-color: var(--bg);

    display: flex;
    justify-content: center;
    align-items: center;

    ul {
        padding-inline: 50px;
        display: flex;
        flex-wrap: wrap;
        gap: 50px;
    }
    ul li {
        position: relative;
        list-style: none;
        width: 80px;
        height: 80px;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        &::before {
            content: '';
            position: absolute;
            inset: 30px;
            /* 模糊半径：10，20，22 */
            box-shadow: 0 0 0 10px var(--clr), 0 0 0 20px var(--bg), 0 0 0 22px var(--clr);
            transition: 0.5s;
        }
        &:hover::before {
            inset: 15px;
        }

        &::after {
            content: '';
            position: absolute;
            inset: 0;
            background-color: var(--bg);
            /*错位展示::before四角阴影  */
            transform: rotate(45deg);
            transition: 0.5s;
        }
        &:hover::after {
            /*复原盖住::before阴影  */
            transform: rotate(0deg);
            inset: -10px;
        }
        &:nth-child(even):hover::after {
            /*偶数展示::before阴影  */
            inset: 0px;
        }

        a {
            text-decoration: none;
            color: #555;
            position: relative;
            z-index: 1;

            display: flex;
            justify-content: center;
            align-items: center;

            .icon {
                font-size: 60px;
                color: var(--clr);
                transition: transform 0.5s;
            }

            .text {
                position: absolute;
                color: var(--clr);
                font-family: consolas;
                opacity: 0;
                transform: scale(0) translateY(200%);
                transition: opacity 0.5s, transform 0.5s;
            }
        }
        &:hover a .icon {
            transform: translateY(-40%);
        }
        &:hover a .text {
            opacity: 1;
            transform: scale(1) translateY(100%);
        }

        &:hover a .icon,
        &:hover a .text {
            filter: drop-shadow(0 0 20px var(--clr)) drop-shadow(0 0 40px var(--clr)) drop-shadow(0 0 60px var(--clr));
        }
    }
}
</style>
