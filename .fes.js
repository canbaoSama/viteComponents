// .fes.js 只负责管理编译时配置，只能使用plain Object

export default {
    publicPath: './',
    access: {
        roles: {
            admin: ['*', '/'],
            manager: ['/'],
        },
    },
    layout: {
        title: 'Fes.js',
        footer: null,
        navigation: 'mixin',
        multiTabs: false,
        menus: [
            {
                name: 'index',
            },
            {
                name: 'img',
                title: '图片功能区',
                children: [{ name: 'imgBeauty' }],
            },
            {
                name: 'vmdeditor',
                title: 'md 编辑',
            },
            {
                name: 'xlsx',
                title: 'xlsx 功能',
            },
            {
                name: 'webgl',
                title: 'webgl 功能',
                children: [
                    { name: 'webgl', title: 'webgl 功能' },
                    { name: '01_start', title: 'webgl 开始' },
                    { name: '02_drawLine', title: 'webgl 画线' },
                    { name: '03_import3D', title: 'webgl 导入3D模型' },
                    { name: '04_geometry', title: '几何体操作' },
                    { name: '05_scenarios', title: '场景图' },
                    { name: '06_texture', title: '纹理贴图' },
                    { name: '07_camera', title: '摄像机' },
                    { name: '08_renderTarget', title: '渲染目标' },
                ],
            },
            {
                name: 'css',
                title: 'css 特效',
                children: [
                    { name: 'textRain', title: '文字雨滴' },
                    { name: 'menuHover', title: '菜单导航悬浮交互' },
                    { name: 'fruitCarousel', title: '水果风味的苏打水轮播' },
                    { name: 'coneLight', title: '锥形探照灯' },
                    { name: 'flowBorder', title: '流动边框' },
                    { name: 'loadingStar', title: '星星粒子加载状态' },
                    { name: 'divergingLightSpot', title: '发散光点' },
                    { name: 'cardHoverSuspension', title: '卡片悬浮' },
                    { name: 'cardLightBorder', title: '卡片发光边角框' },
                    { name: 'infiniteScroll', title: '无限滚动播放' },
                    { name: 'hoverEffect', title: '悬停效果' },
                    { name: 'pingpangEffect', title: '类乒乓特效' },
                ],
            },
        ],
    },
    enums: {
        status: [
            ['0', '无效的'],
            ['1', '有效的'],
        ],
    },
    windicss: {
        config: {
            theme: {
                extend: {
                    colors: {
                        yellow: '#f0ad4e',
                        green: '#17C26E',
                        blue: '#337ab7',
                    },
                    screens: {},
                    borderRadius: {
                        common: '0.375rem',
                    },
                    boxShadow: {
                        common: '0 2px 12px 0 rgba(0,0,0,0.2)',
                    },
                },
            },
            // 白名单，用于拼接的class，如果有直接使用过的class，则可以删除
            safelist: 'text-yellow',
            plugins: [require('windicss/plugin/line-clamp')],
        },
    },
};
