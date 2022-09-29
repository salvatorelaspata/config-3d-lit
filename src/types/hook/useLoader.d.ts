import * as THREE from 'three';
export declare const loadRGBE: _loadRGBEType;
export declare const loadObj: _loadObjType;
export declare const loadObject: _loadObjectType;
export declare const loadTexture: _loadTextureType;
export declare const loadAsyncTexture: _loadAsyncTextureType;
export declare const generateTexture: () => THREE.CanvasTexture;
export declare const loadFBX: _loadFBXType;
export declare const loadModel: (object: ObjectConfig) => Promise<THREE.Group> | Promise<THREE.Object3D<THREE.Event>>;
