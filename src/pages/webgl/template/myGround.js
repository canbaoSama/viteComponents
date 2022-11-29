import * as THREE from 'three'; //导入整个 three.js核心库

// 黑色地板
export const blackFloor = (threeD) => {
    const geometry = new THREE.PlaneGeometry(500, 500);
    const material = new THREE.MeshPhongMaterial({ color: 0x999999, depthWrite: false });
    const ground = new THREE.Mesh(geometry, material);
    ground.position.set(0, -5, 0);
    ground.rotation.x = -Math.PI / 2;
    ground.receiveShadow = true;
    threeD.scene.add(ground);
};

// 虚线棋盘, 需要打光
export const dottedCheckerBoard = (threeD) => {
    blackFloor(threeD);

    const grid = new THREE.GridHelper(500, 100, 0x000000, 0x000000);
    grid.position.y = -5;
    grid.material.opacity = 0.2;
    grid.material.transparent = true;
    threeD.scene.add(grid);

    const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444, 0.6); // 半球光
    hemiLight.position.set(0, 200, 0);
    threeD.scene.add(hemiLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 0.8); // 平行光
    dirLight.position.set(0, 20, 10);
    dirLight.castShadow = true;
    dirLight.shadow.camera.top = 18;
    dirLight.shadow.camera.bottom = -10;
    dirLight.shadow.camera.left = -12;
    dirLight.shadow.camera.right = 12;
    threeD.scene.add(dirLight);
};
