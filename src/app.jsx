import { access, defineRuntimeConfig } from '@fesjs/fes';
import { Button, InputNumber, Input, Popover } from 'ant-design-vue';
import PageLoading from '@/components/PageLoading.vue';
import UserCenter from '@/components/UserCenter.vue';
import 'ant-design-vue/dist/antd.css';

export default defineRuntimeConfig({
    layout: {
        customHeader: <UserCenter />,
    },
    beforeRender: {
        loading: <PageLoading />,
        action() {
            const { setRole } = access;
            return new Promise((resolve) => {
                setTimeout(() => {
                    setRole('admin');
                    // 初始化应用的全局状态，可以通过 useModel('@@initialState') 获取，具体用法看@/components/UserCenter 文件
                    resolve({
                        userName: '李雷',
                    });
                }, 1000);
            });
        },
    },
    onAppCreated: ({ app }) => {
        app.use(Button);
        app.use(InputNumber);
        app.use(Input);
        app.use(Popover);
    },
});
