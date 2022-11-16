import * as THREE from 'three'; //导入整个 three.js核心库
import { EquirectangularReflectionMapping } from 'three'; //导入纹理映射模块
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader'; //导入RGB加载器
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'; //导入控制器模块，轨道控制器
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'; //导入GLTF模块，模型解析器,根据文件格式来定

import { WEBGL } from '@/common/WebGL';

class Base3d {
    default_bg = 0xb9d3ff;
    basePath = 'http://127.0.0.1:5500/public/files/gltf/';

    constructor(canvas) {
        this.container = canvas;
        this.camera = {};
        this.scene = {};
        this.renderer = {};
        this.controls = {};
        this.init();
        //this.animate();
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
        //window.addEventListener('resize', this.onWindowResize.bind(this));
    }
    initScene() {
        this.scene = new THREE.Scene();
        //this.setEnvMap('079');
    }
    initCamera() {
        this.camera = new THREE.PerspectiveCamera(60, this.container.clientWidth / this.container.clientHeight, 0.1, 1000);
        this.camera.position.set(300, 0, 100);
    }
    initRender() {
        this.renderer = new THREE.WebGLRenderer({ canvas: this.container, antialias: true, context: this.container.getContext('webgl2') }); //设置抗锯齿
        this.renderer.setSize(this.container.clientWidth, this.container.clientHeight); //渲染的尺寸大小
        this.renderer.setClearColor(this.default_bg, 1); //设置背景颜色
    }
    setAxisHelper() {
        const axisHelper = new THREE.AxesHelper(300);
        this.scene.add(axisHelper);
    }
    setEnvMap(hdr) {
        //设置环境背景
        new RGBELoader().setPath('./files/hdr/').load(`${hdr}.hdr`, (texture) => {
            texture.mapping = EquirectangularReflectionMapping; //圆柱形形纹理映射
            this.scene.background = texture;
            this.scene.environment = texture;
        });
    }
    render() {
        if (WEBGL.isWebGLAvailable()) {
            if (WEBGL.isWebGL2Available() === false) {
                document.body.appendChild(WEBGL.getWebGL2ErrorMessage());
            } else {
                this.animate();
            }
        } else {
            const warning = WEBGL.getWebGLErrorMessage();
            this.container.appendChild(warning);
        }
    }
    initControls() {
        this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    }
    //加载模型
    setModel(modelName, path) {
        return new Promise((resolve) => {
            const loader = new GLTFLoader().setPath(path ? `${this.basePath}/${path}/` : this.basePath);
            loader.load(modelName, (gltf) => {
                console.log(gltf);
                this.model = gltf.scene.children[0];
                this.scene.add(this.model);
                resolve(`${this.modelName}模型添加成功`);
            });
        });
    }
    addMesh() {
        this.setModel('phone.glb');
    }
    onWindowResize() {
        //调整屏幕大小
        this.camera.aspect = window.innerWidth / window.innerHeight; //摄像机宽高比例
        this.camera.updateProjectionMatrix(); //相机更新矩阵，将3d内容投射到2d面上转换
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }
}
export default Base3d;
