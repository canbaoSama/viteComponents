<template>
    <div class="flex justify-center align-middle">
        <canvas ref="canvas" class="bg-black w-full h-full"></canvas>
    </div>
</template>
<script setup>
import { ref, onMounted } from 'vue';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { defineRouteMeta } from '@fesjs/fes';

import { WEBGL } from '@/common/WebGL';

defineRouteMeta({
    name: 'webgl',
    title: 'webgl 功能',
});

const canvas = ref(null);
onMounted(() => {
    const scene = new THREE.Scene();
    const renderer = new THREE.WebGLRenderer({ canvas: canvas.value, context: canvas.value.getContext('webgl2') });
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(200, 200, 200); //设置相机位置
    camera.lookAt(scene.position); //设置相机方向(指向的场景对象)

    // 建立坐标轴
    const axisHelper = new THREE.AxesHelper(250);
    scene.add(axisHelper);

    const geometry = new THREE.IcosahedronGeometry(50); //创建一个立方体几何对象Geometry
    const material = new THREE.MeshStandardMaterial({ color: 0x00ff00, opacity: 0.7, transparent: true }); //材质对象Material
    const mesh = new THREE.Mesh(geometry, material); //网格模型对象Mesh
    mesh.position.set(120, 0, 0);
    scene.add(mesh);

    const geometry2 = new THREE.SphereGeometry(60, 40, 40);
    const material2 = new THREE.MeshLambertMaterial({ color: 0x0000ff, specular: 0x4488ee, shininess: 12 });
    const mesh2 = new THREE.Mesh(geometry2, material2); //网格模型对象Mesh
    mesh2.position.set(0, 120, 0);
    scene.add(mesh2);

    // 圆柱网格模型
    const geometry3 = new THREE.CylinderGeometry(50, 50, 100, 25);
    const material3 = new THREE.MeshLambertMaterial({ color: 0xffff00 });
    const mesh3 = new THREE.Mesh(geometry3, material3); //网格模型对象Mesh
    // mesh3.translateX(120); //球体网格模型沿Y轴正方向平移120
    mesh3.position.set(0, 0, 120);
    scene.add(mesh3); //

    const point = new THREE.PointLight(0xffffff); // 点光源
    point.position.set(100, 25, 50); //点光源位置
    scene.add(point); //点光源添加到场景中

    const ambient = new THREE.AmbientLight(0x444444); //环境光
    scene.add(ambient);

    const animate = () => {
        // let T1 = new Date(); // 本次时间
        // let t = T1 - T0;
        // T0 = T1;
        renderer.render(scene, camera);
        // mesh.rotateZ(0.001 * t);//每次绕y轴旋转0.01弧度
        requestAnimationFrame(animate); //请求再次执行渲染函数render
    };
    if (WEBGL.isWebGLAvailable()) {
        if (WEBGL.isWebGL2Available() === false) {
            document.body.appendChild(WEBGL.getWebGL2ErrorMessage());
        } else {
            animate();
            // const controls = new THREE.OrbitControls(camera, renderer.domElement);
            // controls.update();
            const contorls = new OrbitControls(camera, renderer.domElement);
            console.log(contorls);
            // controls.addEventListener('change', animate)
        }
    } else {
        const warning = WEBGL.getWebGLErrorMessage();
        canvas.value.appendChild(warning);
    }
});
</script>

<style scoped></style>
