

import eProjectViteComponentsSrcFesPluginLayoutViewsIndexJsx from 'E:/project/viteComponents/src/.fes/plugin-layout/views/index.jsx'
import index from 'E:/project/viteComponents/src/pages/index.vue'

export function getRoutes() {
  const routes = [
  {
    "path": "/",
    "component": eProjectViteComponentsSrcFesPluginLayoutViewsIndexJsx,
    "children": [
      {
        "path": "/",
        "component": index,
        "name": "index",
        "meta": {},
        "count": 5
      }
    ]
  }
];
  return routes;
}

