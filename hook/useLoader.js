import * as THREE from 'three';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js';
const manager = new THREE.LoadingManager();
const objLoader = new OBJLoader(manager);
const objectLoader = new THREE.ObjectLoader();
const fbxLoader = new FBXLoader();
const textureLoader = new THREE.TextureLoader(manager);
manager.onProgress = function (item, loaded, total) {
    console.log(item, loaded, total);
};
const loadRGBE = (path, fileName) => new Promise((resolve, reject) => {
    try {
        const hdrEquirect = new RGBELoader().setPath(path).load(fileName, function () {
            hdrEquirect.mapping = THREE.EquirectangularReflectionMapping;
            resolve(hdrEquirect);
        }, xhr => {
            if (xhr.lengthComputable) {
                const percentComplete = (xhr.loaded / xhr.total) * 100;
                console.log('RGBE', Math.round(percentComplete) + '% downloaded');
            }
        });
    }
    catch (error) {
        reject(error);
    }
});
const loadObj = (path, fileName) => new Promise((resolve, reject) => {
    objLoader.load(`${path}${fileName}`, function (obj) {
        resolve(obj);
    }, xhr => {
        if (xhr.lengthComputable) {
            const percentComplete = (xhr.loaded / xhr.total) * 100;
            console.log('Obj', Math.round(percentComplete) + '% downloaded');
        }
    }, err => {
        reject(err);
    });
});
const loadObjectJSON = (path, fileName) => new Promise((res, rej) => {
    objectLoader.load(`${path}${fileName}`, function (obj) {
        res(obj);
    }, xhr => {
        if (xhr.lengthComputable) {
            const percentComplete = (xhr.loaded / xhr.total) * 100;
            console.log('Object', Math.round(percentComplete) + '% downloaded');
        }
    }, err => {
        rej(err);
    });
});
const loadAsyncTexture = (path, fileName) => new Promise((resolve, reject) => {
    textureLoader.load(`${path}${fileName}`, texture => {
        resolve(texture);
    }, xhr => {
        if (xhr.lengthComputable) {
            const percentComplete = (xhr.loaded / xhr.total) * 100;
            console.log('Texture', Math.round(percentComplete) + '% downloaded');
        }
    }, err => {
        reject(err);
    });
});
const _generateTexture = () => {
    const canvas = document.createElement('canvas');
    canvas.width = 2;
    canvas.height = 2;
    const context = canvas.getContext('2d');
    if (context) {
        context.fillStyle = 'white';
        context.fillRect(0, 1, 2, 1);
    }
    return canvas;
};
const generateTexture = () => {
    const texture = new THREE.CanvasTexture(_generateTexture());
    texture.magFilter = THREE.NearestFilter;
    texture.wrapT = THREE.RepeatWrapping;
    texture.wrapS = THREE.RepeatWrapping;
    texture.repeat.set(1, 0);
    return texture;
};
const loadFBX = (path, fileName) => new Promise((resolve, reject) => {
    fbxLoader.load(`${path}${fileName}`, function (fbx) {
        resolve(fbx);
    }, xhr => {
        if (xhr.lengthComputable) {
            const percentComplete = (xhr.loaded / xhr.total) * 100;
            console.log('FBX', Math.round(percentComplete) + '% downloaded');
        }
    }, err => {
        reject(err);
    });
});
export const loadModel = (object) => {
    // check if the object is type of Object3D
    if (object instanceof THREE.Object3D)
        return Promise.resolve(object);
    if (!!object) {
        const { type, path, fileName } = object;
        return type === 'obj' || !type
            ? loadObj(path, fileName)
            : object.type === 'json'
                ? loadObjectJSON(path, fileName)
                : loadFBX(path, fileName);
    }
    else
        throw new Error('Object is not defined');
};
// background
export const loadBackground = (background) => {
    if (background instanceof THREE.DataTexture)
        return Promise.resolve(background);
    return background
        ? loadRGBE(background.path, background.fileName)
        : Promise.resolve(generateTexture());
};
// texture
export const loadTexture = (texture) => {
    if (texture instanceof THREE.Texture)
        return Promise.resolve(texture);
    return texture
        ? loadAsyncTexture(texture.path, texture.fileName)
        : Promise.resolve(generateTexture());
};
//# sourceMappingURL=useLoader.js.map