import * as THREE from 'three'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader'
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader'
import { ObjectLoader } from 'three'

const manager = new THREE.LoadingManager()
const objLoader = new OBJLoader(manager)
const objectLoader = new ObjectLoader()
const fbxLoader = new FBXLoader()
const textureLoader = new THREE.TextureLoader(manager)

manager.onProgress = function (item, loaded, total) {
  console.log(item, loaded, total)
}

export const loadRGBE: _loadRGBEType = (path, fileName) =>
  new Promise((resolve, reject) => {
    try {
      const hdrEquirect = new RGBELoader()
        .setPath(path)
        .load(fileName, function () {
          hdrEquirect.mapping = THREE.EquirectangularReflectionMapping
          resolve(hdrEquirect)
        })
    } catch (error) {
      reject(error)
    }
  })

export const loadObj: _loadObjType = (path, fileName) =>
  new Promise((resolve, reject) => {
    objLoader.load(
      `${path}${fileName}`,
      function (obj) {
        resolve(obj)
      },
      xhr => {
        if (xhr.lengthComputable) {
          const percentComplete = (xhr.loaded / xhr.total) * 100
          console.log(Math.round(percentComplete) + '% downloaded')
        }
      },
      err => {
        reject(err)
      }
    )
  })

export const loadObject: _loadObjectType = (path, fileName) =>
  new Promise((res, rej) => {
    objectLoader.load(
      `${path}${fileName}`,
      function (obj) {
        res(obj)
      },
      xhr => {
        if (xhr.lengthComputable) {
          const percentComplete = (xhr.loaded / xhr.total) * 100
          console.log(Math.round(percentComplete) + '% downloaded')
        }
      },
      err => {
        rej(err)
      }
    )
  })

// texture
export const loadTexture: _loadTextureType = (path, fileName) =>
  textureLoader.load(`${path}${fileName}`)

export const loadAsyncTexture: _loadAsyncTextureType = (path, fileName) =>
  new Promise((resolve, reject) => {
    textureLoader.load(
      `${path}${fileName}`,
      texture => {
        resolve(texture)
      },
      xhr => {
        if (xhr.lengthComputable) {
          const percentComplete = (xhr.loaded / xhr.total) * 100
          console.log(Math.round(percentComplete) + '% downloaded')
        }
      },
      err => {
        reject(err)
      }
    )
  })

const _generateTexture = () => {
  const canvas = document.createElement('canvas')
  canvas.width = 2
  canvas.height = 2

  const context = canvas.getContext('2d')
  if (context) {
    context.fillStyle = 'white'
    context.fillRect(0, 1, 2, 1)
  }
  return canvas
}

export const generateTexture: () => THREE.CanvasTexture = () => {
  const texture = new THREE.CanvasTexture(_generateTexture())
  texture.magFilter = THREE.NearestFilter
  texture.wrapT = THREE.RepeatWrapping
  texture.wrapS = THREE.RepeatWrapping
  texture.repeat.set(1, 0)
  return texture
}

export const loadFBX: _loadFBXType = (path, fileName) =>
  new Promise((resolve, reject) => {
    fbxLoader.load(
      `${path}${fileName}`,
      function (fbx) {
        resolve(fbx)
      },
      xhr => {
        if (xhr.lengthComputable) {
          const percentComplete = (xhr.loaded / xhr.total) * 100
          console.log(Math.round(percentComplete) + '% downloaded')
        }
      },
      err => {
        reject(err)
      }
    )
  })

export const loadModel = (object: ObjectConfig) => {
  return object?.type === 'obj' || !object?.type
    ? loadObj(object?.path || '/models/obj/', object?.fileName || 'lego.obj')
    : object.type === 'json'
    ? loadObject(
        object?.path || '/models/obj/',
        object?.fileName || 'lego.json'
      )
    : loadFBX(
        object?.path || '/models/fbx/',
        object?.fileName || 'Fruttiera.fbx'
      )
}
