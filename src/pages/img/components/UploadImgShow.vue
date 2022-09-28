<template>
    <div class="flex justify-center w-full items-end">
        <img :src="modelValue || 'src/images/3.jpg'" class="max-w-125 mr-12" @load="imgLoaded" />
        <a-upload
            :show-upload-list="false"
            accept=".jpg,.jpeg,.png,.git,.svg"
            :multiline="false"
            list-type="picture-card"
            class="flex items-center flex-wrap justify-center"
            :beforeUpload="beforeUpload"
        >
            <div class="upload-content">
                <LoadingOutlined v-if="isUploding" style="font-size: 40px; color: #1890ff" />
                <CloudUploadOutlined v-else style="font-size: 40px; color: #1890ff" />
                <div class="mt-1">上传图片预览</div>
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
