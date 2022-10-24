import * as THREE from 'three';
export declare const loadModel: (object: ObjectConfig) => Promise<THREE.Group> | Promise<THREE.Object3D<THREE.Event>>;
export declare const loadBackground: (background?: BackgroundConfig) => Promise<THREE.DataTexture> | Promise<THREE.CanvasTexture>;
export declare const loadTexture: (texture?: TextureConfig) => Promise<THREE.Texture> | Promise<THREE.CanvasTexture>;
