import { access, defineRuntimeConfig } from '@fesjs/fes';
import PageLoading from '@/components/PageLoading.vue';
import UserCenter from '@/components/UserCenter.vue';

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
});
