import { Plugin } from 'E:/project/viteComponents/node_modules/@fesjs/runtime';

const plugin = new Plugin({
  validKeys: ['beforeRender','modifyClientRenderOpts','rootContainer','onAppCreated','render','patchRoutes','modifyCreateHistory','onRouterCreated','access','layout',],
});

export { plugin };
