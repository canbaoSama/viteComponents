import { message } from 'ant-design-vue';

// 复制文本到粘贴板
export function copyText(text) {
    const oInput = document.createElement('input');
    oInput.value = text;
    document.body.appendChild(oInput);
    oInput.select();
    document.execCommand('Copy');
    oInput.remove();
    message.success('复制成功');
}
