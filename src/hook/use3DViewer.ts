import * as THREE from 'three'
import { Object3D } from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
// import { catalog } from "../config/catalog";
// import { actions } from "../store/store";

import { generateTexture, loadModel, loadRGBE, loadTexture } from './useLoader'

const _WIDTH = window.innerWidth // * 0.9
const _HEIGHT = window.innerHeight // * 0.9
const _ASPECT_RATIO = _WIDTH / _HEIGHT

let camera: THREE.PerspectiveCamera,
  scene: THREE.Scene,
  controls: OrbitControls,
  sceneMeshes = [],
  renderer: THREE.WebGLRenderer

const _createMaterial = (
  customTexture: boolean,
  texture: THREE.Texture,
  hdrEquirect: THREE.Texture
) => {
  const meshParams = {
    // color: 0xffffff,
    transmission: 0,
    opacity: 1,
    metalness: 0.2,
    roughness: 0,
    ior: 1.5,
    // thickness: 0.01,
    specularIntensity: 1,
    // specularColor: 0xffffff,
    specularColor: new THREE.Color(0xffffff),
    envMapIntensity: 1,
    // lightIntensity: 1,
  }
  const r = Math.round(255 * Math.random())
  const g = Math.round(255 * Math.random())
  const b = Math.round(255 * Math.random())
  const randomColor = 'rgb(' + r + ', ' + g + ', ' + b + ')'

  return new THREE.MeshPhysicalMaterial({
    color: randomColor,
    metalness: meshParams.metalness,
    roughness: meshParams.roughness,
    ior: meshParams.ior,
    envMap: hdrEquirect,
    ...(customTexture ? { map: texture } : { alphaMap: texture }),
    envMapIntensity: meshParams.envMapIntensity,
    transmission: meshParams.transmission, // use material.transmission for glass materials
    specularIntensity: meshParams.specularIntensity,
    specularColor: meshParams.specularColor,
    opacity: meshParams.opacity,
    side: THREE.DoubleSide,
    transparent: true,
  })
}

const _onWindowResize = () => {
  // console.log("_onWindowResize", _WIDTH, _HEIGHT);
  const width = window.innerWidth // * 0.9
  const height = window.innerHeight // * 0.9

  camera.aspect = width / height
  camera.updateProjectionMatrix()

  renderer.setSize(width, height)
}

const _managePosition = (
  obj: THREE.Object3D,
  camera: {
    position: { set: (arg0: any, arg1: number, arg2: number) => void }
  },
  controls: { target: any }
) => {
  const boundingBox = new THREE.Box3().setFromObject(obj)
  console.log(boundingBox)
  const {
    min: { x: minX, y: minY, z: minZ },
    max: { x: maxX, y: maxY, z: maxZ },
  } = boundingBox
  const deltaX = (maxX - minX) / 2
  const deltaY = (maxY - minY) / 2
  const deltaZ = (maxZ - minZ) / 2
  console.log(deltaX, deltaY, deltaZ)
  obj.position.set(0, -deltaY, 0)
  camera.position.set(maxX + maxX * 3, 0, 0) // x, y, z
  controls.target = new THREE.Vector3(0, 0, 0)
}

export const applyTextureOnMesh = (
  obj: THREE.Object3D,
  customTexture: boolean,
  hdrEquirect: THREE.Texture
) => {
  let texture: THREE.Texture
  if (customTexture) {
    // local texture
    // texture = loadTexture('/models/textures/', 'uv_grid_opengl.jpg')
    // cdn texture
    texture = loadTexture(
      'https://cdn.pixabay.com/photo/2018/02/24/11/09/',
      'background-3177833_960_720.jpg'
    )
  } else {
    texture = generateTexture()
  }
  // texture &&
  obj &&
    obj.traverse(function (child) {
      child.addEventListener('click', (a: THREE.Event) => {
        console.log('click', a)
      })
      if (child instanceof THREE.Mesh) {
        child.material = _createMaterial(customTexture, texture, hdrEquirect)
        // actions.addComponent(child)
        sceneMeshes.push(child)
      } else {
        // console.log("Not managed", child);
      }
    })
}

export const use3DViewer = (
  mount: HTMLDivElement | undefined,
  modelConfig: Viewer3d
) => {
  const { object, background } = modelConfig
  // load hdr equirectangular texture for environment mapping
  loadRGBE(background.path, background.fileName).then(hdrEquirect => {
    // load object model .obj
    console.log(object?.type)
    // Promise.all([ ]).then(([ ]) => { })
    loadModel(object).then((obj: Object3D) => {
      obj.rotation.set(0, 90, 0)
      // apply random mesh color to object model
      applyTextureOnMesh(obj, true, hdrEquirect)
      // create and configure renderer
      renderer = new THREE.WebGLRenderer({ antialias: true })
      renderer.setPixelRatio(window.devicePixelRatio)
      renderer.setSize(_WIDTH, _HEIGHT)
      renderer.shadowMap.enabled = true
      renderer.toneMapping = THREE.ACESFilmicToneMapping
      renderer.toneMappingExposure = 1
      renderer.outputEncoding = THREE.sRGBEncoding
      // mount renderer to dom
      mount && mount && mount.appendChild(renderer.domElement)
      // create scene
      scene = new THREE.Scene()
      // create camera
      camera = new THREE.PerspectiveCamera(75, _ASPECT_RATIO, 0.1, 1000)
      // set texture environment mapping
      scene.background = hdrEquirect
      // add obj to scene
      scene.add(obj)
      // orbit controls
      controls = new OrbitControls(camera, renderer.domElement)
      // settings camera and objec position
      _managePosition(obj, camera, controls)
      // ANIMATE
      const renderAndAnimate = () => {
        requestAnimationFrame(renderAndAnimate)
        if (obj) obj.rotation.y -= 0.002
        // required if controls.enableDamping or controls.autoRotate are set to true
        controls.update()
        renderer.render(scene, camera)
      }
      renderAndAnimate()
      window.addEventListener('resize', _onWindowResize)
    })
  })
}
