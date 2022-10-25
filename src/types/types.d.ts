export type type3D = 'obj' | 'fbx' | 'json'
// VIEWER
export type ObjectConfig =
  | {
      path: string
      fileName: string
      type: type3D
    }
  | THREE.Object3D

export type TextureConfig =
  | {
      path: string
      fileName: string
    }
  | THREE.Texture

export type BackgroundConfig =
  | {
      path: string
      fileName: string
    }
  | THREE.DataTexture

export interface Viewer3dType {
  object: ObjectConfig
  texture?: TextureConfig
  background?: BackgroundConfig
}

export interface ObjectViewer3d extends Viewer3dType {
  objId: string
  showStars: boolean
  price: string
  title: string
  description: string
  image: string
  link: string
}
// USE LOADER

export type _loadRGBEType = (
  path: string,
  fileName: string
) => Promise<THREE.DataTexture>

export type _loadObjType = (
  path: string,
  fileName: string
) => Promise<THREE.Group>

export type _loadObjectType = (
  path: string,
  fileName: string
) => Promise<THREE.Object3D>

// export type _loadTextureType = (texture?: TextureConfig) => THREE.Texture

export type _loadAsyncTextureType = (
  path: string,
  fileName: string
) => Promise<THREE.Texture>

export type _loadFBXType = (
  path: string,
  fileName: string
) => Promise<THREE.Group>
