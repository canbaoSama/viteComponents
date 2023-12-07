<template>
    <div class="cone-light-container">
        <div class="title">猛虎王*狂野猩*暴龙神</div>
    </div>
</template>
<script setup>
import { defineRouteMeta } from '@fesjs/fes';

defineRouteMeta({
    name: 'coneLight',
    title: '锥形探照灯',
});
</script>
<style lang="less" scoped>
.cone-light-container {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #102733;
    color: #eee5;
    font-family: 'Commissioner', sans-serif;
    .title {
        font-size: 40px;
        height: 80px;
        line-height: 80px;
        background: conic-gradient(from var(--rotate) at 29% -20%, #0b1012 40%, white, #0b1012 60%);
        background-clip: text;
        -webkit-background-clip: text;
        color: transparent;
        animation: rotateLight 3s ease-in-out infinite alternate;
    }
}

@property --rotate {
    syntax: '<angle>';
    inherits: false;
    initial-value: 0deg;
}
@keyframes rotateLight {
    from {
        --rotate: 0.15turn;
    }

    to {
        --rotate: -0.15turn;
    }
}
</style>
