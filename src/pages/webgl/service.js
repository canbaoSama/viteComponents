import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

import { WEBGL } from '@/common/WebGL';

// 渲染webgl
export const renderWebgl = (scene, camera, renderer, canvas, animate) => {
    //执行渲染操作   指定场景、相机作为参数
    if (WEBGL.isWebGLAvailable()) {
        if (WEBGL.isWebGL2Available() === false) {
            document.body.appendChild(WEBGL.getWebGL2ErrorMessage());
        } else {
            animate ? animate() : renderer.render(scene, camera);
            const contorls = new OrbitControls(camera, renderer.domElement);
            console.log(contorls);
        }
    } else {
        const warning = WEBGL.getWebGLErrorMessage();
        canvas.value.appendChild(warning);
    }
};
