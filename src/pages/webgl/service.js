import * as THREE from 'three'; //导入整个 three.js核心库
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'; //导入控制器模块，轨道控制器
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'; //导入GLTF模块，模型解析器,根据文件格式来定

import { WEBGL } from '@/common/WebGL';

// 公共的基础类，满足简单需求
export class Base3d {
    default_bg = 0xb9d3ff;
    default_point_color = 0xffffff;
    basePath = 'http://127.0.0.1:5500/public/files/gltf/';
    camera;
    scene;
    renderer;
    controls;
    constructor(canvas) {
        this.container = canvas;
        this.init();
    }
    init() {
        //初始化场景
        this.initScene();
        //初始化相机
        this.initCamera();
        //初始化渲染器
        this.initRender();
        //初始化控制器，控制摄像头,控制器一定要在渲染器后
        this.initControls();
        //监听场景大小改变，跳转渲染尺寸
        window.addEventListener('resize', this.onWindowResize.bind(this));
    }
    initScene() {
        this.scene = new THREE.Scene();
    }
    initCamera() {
        this.camera = new THREE.PerspectiveCamera(60, this.container.clientWidth / this.container.clientHeight, 0.1, 1000);
        this.camera.position.set(300, 100, 100);
    }
    initRender() {
        this.renderer = new THREE.WebGLRenderer({ canvas: this.container, antialias: true, context: this.container.getContext('webgl2') }); //设置抗锯齿
        this.renderer.setSize(this.container.clientWidth, this.container.clientHeight); //渲染的尺寸大小
        // this.renderer.setClearColor(this.default_bg, 1); //设置背景颜色
    }
    setAxisHelper() {
        const axisHelper = new THREE.AxesHelper(300);
        this.scene.add(axisHelper);
    }
    setPointLight(position = [200, 200, 100]) {
        // 点光源
        const point = new THREE.PointLight(this.default_point_color);
        point.position.set(...position); //点光源位置
        this.scene.add(point); //点光源添加到场景中
    }
    setAmbientLight() {
        // 环境光
        const ambient = new THREE.AmbientLight(0x444444);
        this.scene.add(ambient);
    }
    setDirectionalLight() {
        // 平行光
        const light = new THREE.DirectionalLight({ color: 0xffffff, intensity: 1 });
        light.position.set(100, 100, 100);
        this.scene.add(light);
    }
    render() {
        if (WEBGL.isWebGLAvailable()) {
            if (WEBGL.isWebGL2Available() === false) {
                document.body.appendChild(WEBGL.getWebGL2ErrorMessage());
            } else {
                this.renderer.render(this.scene, this.camera);
            }
        } else {
            const warning = WEBGL.getWebGLErrorMessage();
            this.container.appendChild(warning);
        }
    }
    initControls() {
        this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    }
    setGLTFLoader(modelName, options) {
        // 加载 gltf 3D模型
        const { path = '', controls } = options;
        return new Promise((resolve, reject) => {
            const loader = new GLTFLoader().setPath(path ? `${this.basePath}${path}/` : this.basePath);
            loader.load(
                modelName,
                (gltf) => {
                    if (controls) {
                        resolve(gltf);
                    } else {
                        gltf.scene.children[0].scale.set(10, 10, 10);
                        this.scene.add(gltf.scene);
                    }
                },
                (xhr) => {
                    console.log(`${(xhr.loaded / xhr.total) * 100}% loaded`);
                },
                (err) => {
                    console.log(err);
                    reject(err);
                },
            );
        });
    }
    onWindowResize() {
        //调整屏幕大小
        this.camera.aspect = this.container.clientWidth / this.container.clientHeight; //摄像机宽高比例
        this.camera.updateProjectionMatrix(); //相机更新矩阵，将3d内容投射到2d面上转换
        this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
    }
}
export class AxisGridHelper {
    constructor(node, units = 10) {
        const axes = new THREE.AxesHelper();
        axes.material.depthTest = false;
        axes.renderOrder = 2; // after the grid
        node.add(axes);

        const grid = new THREE.GridHelper(units, units);
        grid.material.depthTest = false;
        grid.renderOrder = 1;
        node.add(grid);

        this.grid = grid;
        this.axes = axes;
        this.visible = false;
    }
    get visible() {
        return this._visible;
    }
    set visible(v) {
        this._visible = v;
        this.grid.visible = v;
        this.axes.visible = v;
    }
}
