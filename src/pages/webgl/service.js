import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import * as THREE from 'three';

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
        canvas.appendChild(warning);
    }
};

// 基础的 webgl 创建
export const createWebgl = (canvas) => {
    const scene = new THREE.Scene();

    // 相机设置
    const width = canvas.clientWidth; //canvas宽度
    const height = canvas.clientHeight; //canvas高度
    const k = width / height; //窗口宽高比
    const s = 200; //三维场景显示范围控制系数，系数越大，显示的范围越大
    const camera = new THREE.OrthographicCamera(-s * k, s * k, s, -s, 1, 1000); //创建相机对象
    camera.position.set(200, 300, 200); //设置相机位置
    camera.lookAt(scene.position); //设置相机方向(指向的场景对象)

    // 建立坐标轴
    const axisHelper = new THREE.AxesHelper(300);
    scene.add(axisHelper);

    // 创建渲染器对象
    const renderer = new THREE.WebGLRenderer({ canvas, context: canvas.getContext('webgl2') });
    renderer.setSize(width, height); //设置渲染区域尺寸
    renderer.setClearColor(0xb9d3ff, 1); //设置背景颜色

    const animate = () => {
        renderer.render(scene, camera);
        requestAnimationFrame(animate); //请求再次执行渲染函数render
    };

    const render = (renderScene) => {
        renderWebgl(renderScene, camera, renderer, canvas, animate);
    };

    return {
        scene,
        renderer,
        camera,

        render,
    };
};
