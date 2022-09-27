// VIEWER
type ObjectConfig = {
  path: string
  fileName: string
  type: string
}

type TextureConfig = {
  path: string
  fileName: string
}

type BackgroundConfig = {
  path: string
  fileName: string
}

interface Viewer3dType {
  object: ObjectConfig
  texture: TextureConfig
  background: BackgroundConfig
}

interface ObjectViewer3d extends Viewer3dType {
  objId: string
  showStars: boolean
  price: string
  title: string
  description: string
  image: string
  link: string
}
// USE LOADER

type _loadRGBEType = (
  path: string,
  fileName: string
) => Promise<THREE.DataTexture>

type _loadObjType = (path: string, fileName: string) => Promise<THREE.Group>

type _loadObjectType = (
  path: string,
  fileName: string
) => Promise<THREE.Object3D>

type _loadTextureType = (path: string, fileName: string) => THREE.Texture

type _loadAsyncTextureType = (
  path: string,
  fileName: string
) => Promise<THREE.Texture>

type _loadFBXType = (path: string, fileName: string) => Promise<THREE.Group>