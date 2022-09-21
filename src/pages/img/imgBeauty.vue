<template>
    <div class="public-template">
        <a-tabs v-model:activeKey="activeKey">
            <a-tab-pane key="getMajorColor">
                <template #tab><BgColorsOutlined />获取图片主颜色</template>
                <div class="tab-container">
                    <getMajorColor />
                </div>
            </a-tab-pane>
            <a-tab-pane key="imgLoading">
                <template #tab><RetweetOutlined />图片加载</template>
                <div class="tab-container">
                    <ImgLoding />
                </div>
            </a-tab-pane>
            <a-tab-pane key="potraceSvg">
                <template #tab><DownloadOutlined />生成svg图片</template>
                <div class="tab-container"><PotraceSvg /></div>
            </a-tab-pane>
            <a-tab-pane key="multiColumn">
                <template #tab><AppstoreAddOutlined />图片布局</template>
                <ImgLayout />
            </a-tab-pane>
        </a-tabs>
    </div>
</template>
<script setup>
import { defineRouteMeta } from '@fesjs/fes';
import { ref } from 'vue';
import { BgColorsOutlined, RetweetOutlined, DownloadOutlined, AppstoreAddOutlined } from '@ant-design/icons-vue';
import PotraceSvg from './components/PotraceSvg.vue';
import ImgLoding from './components/ImgLoading.vue';
import getMajorColor from './components/GetMajorColor.vue';
import ImgLayout from './components/ImgLayout.vue';

defineRouteMeta({
    name: 'imgBeauty',
    title: '图片功能区',
});

const activeKey = ref('getMajorColor');
</script>
<style lang="less" scoped>
.tab-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    width: 100%;
}
</style>
