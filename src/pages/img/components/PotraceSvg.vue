<template>
    <div class="img-page">
        <UploadImgShow v-model="src" @emitImgLoaded="emitImgLoaded" />
        <div class="operate-content">
            <div class="operate-content-item">width: &nbsp;&nbsp;<a-input-number v-model:value="form.width" :min="0" :max="600" :precision="0" /></div>
            <div class="operate-content-item">height: &nbsp;&nbsp;<a-input-number v-model:value="form.height" :min="0" :max="600" :precision="0" /></div>
            <div class="operate-content-item">
                <a-popover :title="颜色选择" trigger="click">
                    <template #content>
                        <ColorPicker @colorChange="colorChange" />
                    </template>
                    <div :style="{ backgroundColor: form.color }" class="color-show"></div>
                </a-popover>
                <a-input v-model:value="form.color" disabled :style="{ color: form.color }" />
            </div>
        </div>
        <div class="operate-btns">
            <a-button type="success" @click="createSvg">生成svg图片</a-button>
            <a-button type="warning" @click="ratioImg">保持图片比例</a-button>
            <a-button type="primary"><a :href="svgHref" download>点击下载</a></a-button>
        </div>
        <div ref="imgRef" class="write-img"></div>
    </div>
</template>
<script setup>
import { defineRouteMeta } from '@fesjs/fes';
import Potrace from 'potrace';
import { ref } from 'vue';
import { ColorPicker } from 'vue-accessible-color-picker';
import { debounce } from 'lodash-es';
import UploadImgShow from './UploadImgShow.vue';

defineRouteMeta({
    name: 'potrace',
    title: 'potrace 生成svg',
});

const src = ref('src/images/3.jpg');
const imgRef = ref();

const sourceData = {
    width: 0,
    height: 0,
};
const form = ref({
    background: '#fff',
    color: '#000',
    threshold: 120,
    steps: 3,
    width: '',
    height: '',
    // turnPolicy: Potrace.TURNPOLICY_MINORITY,
    // turdSize: 2,
    // alphaMax: 1,
    // optCurve: true,
    //optTolerance: 0.2,
    // blackOnWhite: true,
});

const emitImgLoaded = (data) => {
    sourceData.width = data.width;
    sourceData.height = data.height;
    form.value.width = sourceData.width;
    form.value.height = sourceData.height;
};

const svgHref = ref('');
const createSvg = debounce(() => {
    Potrace.trace(src.value, form.value, (err, svg) => {
        const parser = new DOMParser();
        svgHref.value = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
        const doc = parser.parseFromString(svg, 'image/svg+xml');
        imgRef.value.innerHTML = '';
        imgRef.value.append(doc.getElementsByTagName('svg')[0]);
    });
}, 1000);
const colorChange = (e) => {
    form.value.color = e?.colors?.hex;
    createSvg();
};
const ratioImg = () => {
    form.value.height = (form.value.width * sourceData.height) / sourceData.width;
    createSvg();
};
</script>
<style lang="less" scoped>
.operate-content {
    margin: 24px 12px;
    display: flex;
    .operate-content-item {
        display: flex;
        align-items: center;
        &:not(:first-child) {
            margin-left: 24px;
        }
        .color-show {
            width: 80px;
            height: 100%;
            cursor: pointer;
        }
    }
}
.write-img {
    width: 500px;
    margin-top: 20px;
    svg {
        width: 100%;
        max-width: 100%;
    }
}
.operate-btns {
    display: flex;
    align-items: center;
    margin-top: 24px;
    .ant-btn:not(:first-child) {
        margin-left: 40px;
    }
}
</style>
