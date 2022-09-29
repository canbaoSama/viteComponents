<template>
    <div class="h-full">
        <a-button
            type="primary"
            href="http://ckang1229.gitee.io/vue-markdown-editor/zh/quick-start.html#%E5%AE%89%E8%A3%85"
            target="blank"
            class="mb-4 float-right"
        >
            官网文档
        </a-button>
        <v-md-editor
            v-model="text"
            leftToolbar="undo redo clear | h bold italic strikethrough quote | ul ol table hr | link image code | emoji"
            :disabled-menus="[]"
            height="calc(100% - 55px)"
            @uploadImage="handleUploadImage"
            @save="submit"
        >
        </v-md-editor>
    </div>
</template>
<script setup>
import { defineRouteMeta } from '@fesjs/fes';
import { ref } from 'vue';

import 'prismjs/components/prism-json';
import '@kangc/v-md-editor/lib/style/base-editor.css';
import '@kangc/v-md-editor/lib/theme/style/vuepress.css';
import '@kangc/v-md-editor/lib/plugins/emoji/emoji.css';

defineRouteMeta({
    name: 'imgBeauty',
    title: '图片功能区',
});

const text = ref();
// 上传图片
const handleUploadImage = () => {};
// 保存
const submit = () => {};
</script>

<config>
{
    "name": "vmdeditor",
    "title": "v-md-editor编辑器"
}
</config>
