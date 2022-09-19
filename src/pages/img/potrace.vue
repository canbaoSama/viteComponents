<template>
    <div class="img-page">
        <div class="sel-area">
            <div class="control-left">
                <img ref="sourceImgRef" class="source-img" src="@/images/1.png" @load="loadSourceImg" />
                <div class="width-height">
                    <div>width: <a-input-number v-model:value="form.width" :min="100" :max="600" :precision="0" /></div>
                    <div>height: <a-input-number v-model:value="form.height" :min="20" :max="500" :precision="0" /></div>
                </div>
            </div>
            <div class="control-right">
                <ColorPicker @colorChange="colorChange" />
            </div>
            {{ form.color }}
        </div>
        <div class="operate-btns">
            <a-button type="primary" @click="ratioImg">保持图片比例</a-button>
            <a-button type="primary" @click="createSvg">生成svg图片</a-button>
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

defineRouteMeta({
    name: 'potrace',
    title: 'potrace 生成svg',
});

const sourceImgRef = ref();
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

const loadSourceImg = (e) => {
    sourceData.width = e.target.width;
    sourceData.height = e.target.height;
    form.value.width = sourceData.width;
    form.value.height = sourceData.height;
};

const ratioImg = () => {
    form.value.height = (form.value.width * sourceData.height) / sourceData.width;
};

const svgHref = ref('');
const createSvg = debounce(() => {
    Potrace.trace('/src/images/1.png', form.value, (err, svg) => {
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
</script>
<style lang="less" scoped>
.sel-area {
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-width: 1000px;
    .control-left {
        width: 50%;
        .source-img {
            width: 100%;
        }
        .width-height {
            margin: 24px 12px;
            display: flex;
            justify-content: space-around;
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
