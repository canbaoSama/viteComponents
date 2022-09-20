<template>
    <div class="upload-img-show">
        <img :src="modelValue || 'src/images/3.jpg'" class="source-img" @load="imgLoaded" />
        <a-upload
            :show-upload-list="false"
            accept=".jpg,.jpeg,.png,.git,.svg"
            :multiline="false"
            list-type="picture-card"
            class="upload-img"
            :beforeUpload="beforeUpload"
        >
            <div class="upload-content">
                <LoadingOutlined v-if="isUploding" style="font-size: 40px; color: #1890ff" />
                <CloudUploadOutlined v-else style="font-size: 40px; color: #1890ff" />
                <div class="upload-title">上传图片预览</div>
            </div>
        </a-upload>
    </div>
</template>
<script setup>
import { ref } from 'vue';
import { CloudUploadOutlined, LoadingOutlined } from '@ant-design/icons-vue';

defineProps({ modelValue: String });
const emits = defineEmits(['update:modelValue', 'emitImgLoaded']);

const isUploding = ref(false);
const beforeUpload = (file) => {
    isUploding.value = true;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = (res) => {
        isUploding.value = false;
        emits('update:modelValue', res.target.result);
    };
    return false;
};

const imgLoaded = (e) => {
    emits('emitImgLoaded', { width: e.currentTarget.width, height: e.currentTarget.height });
};
</script>
<style lang="less" scoped>
.upload-img-show {
    display: flex;
    justify-content: space-between;
    width: 100%;
    align-items: flex-end;
    .source-img {
        max-width: 500px;
        margin-right: 50px;
    }
    .upload-content {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        justify-content: center;
        .upload-title {
            margin-top: 4px;
        }
    }
}
</style>
