export class Map {
    constructor(scene) {
        this.scene = scene;
        this.colliders = [];

        this.createEnvironment();
        this.createLighting();
        this.createObstacles();
    }

    createEnvironment() {
        // Пол арены
        const floorGeometry = new THREE.BoxGeometry(50, 0.5, 50);
        const floorMaterial = new THREE.MeshStandardMaterial({
            color: 0x556B2F,
            roughness: 0.8,
            metalness: 0.2
        });
        const floor = new THREE.Mesh(floorGeometry, floorMaterial);
        floor.position.y = -0.25;
        floor.receiveShadow = true;
        floor.geometry.computeBoundingBox();
        
        this.scene.add(floor);
        this.colliders.push(floor);

        // Внешние стены
        this.createWall(0, 2.5, -25, 50, 5, 1, 0x8B4513); // Задняя стена
        this.createWall(0, 2.5, 25, 50, 5, 1, 0x8B4513);  // Передняя стена
        this.createWall(-25, 2.5, 0, 1, 5, 50, 0x8B4513); // Левая стена
        this.createWall(25, 2.5, 0, 1, 5, 50, 0x8B4513);  // Правая стена

        console.log('Окружение создано');
    }

    createWall(x, y, z, width, height, depth, color) {
        const geometry = new THREE.BoxGeometry(width, height, depth);
        const material = new THREE.MeshStandardMaterial({
            color: color,
            roughness: 0.9,
            metalness: 0.1
        });
        const wall = new THREE.Mesh(geometry, material);
        wall.position.set(x, y, z);
        wall.castShadow = true;
        wall.receiveShadow = true;
        wall.geometry.computeBoundingBox();
        
        this.scene.add(wall);
        this.colliders.push(wall);
        
        return wall;
    }

    createLighting() {
        // Ambient освещение
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
        this.scene.add(ambientLight);

        // Направленный свет (солнце)
        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
        directionalLight.position.set(20, 30, 10);
        directionalLight.castShadow = true;
        
        // Настройка теней
        directionalLight.shadow.mapSize.width = 2048;
        directionalLight.shadow.mapSize.height = 2048;
        directionalLight.shadow.camera.near = 0.5;
        directionalLight.shadow.camera.far = 100;
        directionalLight.shadow.camera.left = -30;
        directionalLight.shadow.camera.right = 30;
        directionalLight.shadow.camera.top = 30;
        directionalLight.shadow.camera.bottom = -30;
        
        this.scene.add(directionalLight);

        // Точечные источники света
        const pointLight1 = new THREE.PointLight(0xff9900, 1, 20);
        pointLight1.position.set(-10, 3, -10);
        pointLight1.castShadow = true;
        this.scene.add(pointLight1);

        const pointLight2 = new THREE.PointLight(0x0099ff, 1, 20);
        pointLight2.position.set(10, 3, 10);
        pointLight2.castShadow = true;
        this.scene.add(pointLight2);

        console.log('Освещение создано');
    }

    createObstacles() {
        // Центральная платформа
        const platform = this.createBox(0, 1, 0, 8, 2, 8, 0x696969);
        
        // Ящики и укрытия
        this.createBox(-10, 1, -10, 2, 2, 2, 0xA0522D);
        this.createBox(10, 1, -10, 2, 2, 2, 0xA0522D);
        this.createBox(-10, 1, 10, 2, 2, 2, 0xA0522D);
        this.createBox(10, 1, 10, 2, 2, 2, 0xA0522D);

        // Высокие стены-укрытия
        this.createBox(-15, 1.5, 0, 2, 3, 6, 0x808080);
        this.createBox(15, 1.5, 0, 2, 3, 6, 0x808080);
        this.createBox(0, 1.5, -15, 6, 3, 2, 0x808080);
        this.createBox(0, 1.5, 15, 6, 3, 2, 0x808080);

        // Дополнительные мелкие ящики
        this.createBox(-5, 0.5, -5, 1, 1, 1, 0xDEB887);
        this.createBox(5, 0.5, -5, 1, 1, 1, 0xDEB887);
        this.createBox(-5, 0.5, 5, 1, 1, 1, 0xDEB887);
        this.createBox(5, 0.5, 5, 1, 1, 1, 0xDEB887);

        // Башни по углам
        this.createBox(-18, 2, -18, 3, 4, 3, 0x654321);
        this.createBox(18, 2, -18, 3, 4, 3, 0x654321);
        this.createBox(-18, 2, 18, 3, 4, 3, 0x654321);
        this.createBox(18, 2, 18, 3, 4, 3, 0x654321);

        // Длинные стены-коридоры
        this.createBox(-8, 1.5, -18, 1, 3, 8, 0x696969);
        this.createBox(8, 1.5, -18, 1, 3, 8, 0x696969);
        this.createBox(-8, 1.5, 18, 1, 3, 8, 0x696969);
        this.createBox(8, 1.5, 18, 1, 3, 8, 0x696969);

        // Круглые колонны
        this.createCylinder(-12, 2, -6, 0.5, 4, 0x4A4A4A);
        this.createCylinder(12, 2, -6, 0.5, 4, 0x4A4A4A);
        this.createCylinder(-12, 2, 6, 0.5, 4, 0x4A4A4A);
        this.createCylinder(12, 2, 6, 0.5, 4, 0x4A4A4A);

        console.log('Препятствия созданы');
    }

    createBox(x, y, z, width, height, depth, color) {
        const geometry = new THREE.BoxGeometry(width, height, depth);
        const material = new THREE.MeshStandardMaterial({
            color: color,
            roughness: 0.8,
            metalness: 0.2
        });
        const box = new THREE.Mesh(geometry, material);
        box.position.set(x, y, z);
        box.castShadow = true;
        box.receiveShadow = true;
        box.geometry.computeBoundingBox();
        
        this.scene.add(box);
        this.colliders.push(box);
        
        return box;
    }

    createCylinder(x, y, z, radius, height, color) {
        const geometry = new THREE.CylinderGeometry(radius, radius, height, 16);
        const material = new THREE.MeshStandardMaterial({
            color: color,
            roughness: 0.8,
            metalness: 0.3
        });
        const cylinder = new THREE.Mesh(geometry, material);
        cylinder.position.set(x, y, z);
        cylinder.castShadow = true;
        cylinder.receiveShadow = true;
        
        // Создаём bounding box для цилиндра
        const box = new THREE.Box3().setFromObject(cylinder);
        cylinder.geometry.boundingBox = box;
        
        this.scene.add(cylinder);
        this.colliders.push(cylinder);
        
        return cylinder;
    }

    getColliders() {
        return this.colliders;
    }

    // Метод для добавления дополнительных объектов (например, врагов)
    addObject(object) {
        this.scene.add(object);
        if (object.geometry) {
            object.geometry.computeBoundingBox();
            this.colliders.push(object);
        }
    }

    // Метод для создания интерактивных объектов (двери, кнопки и т.д.)
    createInteractiveObject(x, y, z, type) {
        let object;
        
        switch (type) {
            case 'door':
                object = this.createBox(x, y, z, 3, 4, 0.3, 0x8B4513);
                object.userData = { type: 'door', isOpen: false };
                break;
            case 'button':
                object = this.createBox(x, y, z, 0.5, 0.5, 0.2, 0xFF0000);
                object.userData = { type: 'button', isPressed: false };
                break;
        }
        
        return object;
    }

    // Метод для проверки видимости между двумя точками (для AI)
    checkLineOfSight(start, end) {
        const direction = new THREE.Vector3().subVectors(end, start).normalize();
        const distance = start.distanceTo(end);
        
        const raycaster = new THREE.Raycaster(start, direction, 0, distance);
        const intersects = raycaster.intersectObjects(this.colliders, true);
        
        return intersects.length === 0;
    }

    // Получение случайной позиции спавна на карте
    getRandomSpawnPosition() {
        const spawnPoints = [
            new THREE.Vector3(0, 1.7, 0),
            new THREE.Vector3(-10, 1.7, -10),
            new THREE.Vector3(10, 1.7, -10),
            new THREE.Vector3(-10, 1.7, 10),
            new THREE.Vector3(10, 1.7, 10),
        ];
        
        return spawnPoints[Math.floor(Math.random() * spawnPoints.length)].clone();
    }
}