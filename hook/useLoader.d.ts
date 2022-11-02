import * as THREE from 'three';
import { BackgroundConfig, ObjectConfig, TextureConfig } from '../types/types';
export declare const loadModel: (object: ObjectConfig) => Promise<THREE.Group> | Promise<THREE.Object3D<THREE.Event>>;
export declare const loadBackground: (background?: BackgroundConfig) => Promise<THREE.DataTexture> | Promise<THREE.CanvasTexture>;
export declare const loadTexture: (texture?: TextureConfig) => Promise<THREE.Texture> | Promise<THREE.CanvasTexture>;
//# sourceMappingURL=useLoader.d.ts.map