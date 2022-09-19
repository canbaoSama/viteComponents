// .fes.js 只负责管理编译时配置，只能使用plain Object

export default {
    publicPath: './',
    access: {
        roles: {
            admin: ['*'],
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
                title: '图片组件',
                children: [{ name: 'getMajor' }, { name: 'cwebpBin' }, { name: 'potrace' }],
            },
        ],
    },
    enums: {
        status: [
            ['0', '无效的'],
            ['1', '有效的'],
        ],
    },
};
