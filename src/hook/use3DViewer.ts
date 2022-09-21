import * as THREE from 'three'
import { Object3D } from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
// import { catalog } from "../config/catalog";
// import { actions } from "../store/store";
import {
  generateTexture,
  loadFBX,
  loadObj,
  loadObject,
  loadRGBE,
} from './useLoader'

let texture = generateTexture()
// const setTexture = t => {
//   texture = t
// }
// let hdrEquirect: any = generateTexture()
// let obj: any

const meshParams = {
  color: 0xffffff,
  transmission: 0,
  opacity: 1,
  metalness: 0.2,
  roughness: 0,
  ior: 1.5,
  thickness: 0.01,
  specularIntensity: 1,
  // specularColor: 0xffffff,
  specularColor: new THREE.Color(0xffffff),
  envMapIntensity: 1,
  lightIntensity: 1,
  exposure: 1,
}

const _WIDTH = window.innerWidth // * 0.9
const _HEIGHT = window.innerHeight // * 0.9
const _ASPECT_RATIO = _WIDTH / _HEIGHT

let camera: THREE.PerspectiveCamera,
  scene: THREE.Scene,
  controls: OrbitControls,
  sceneMeshes = [],
  renderer: THREE.WebGLRenderer

const _onWindowResize = () => {
  // console.log("_onWindowResize", _WIDTH, _HEIGHT);
  const width = window.innerWidth // * 0.9
  const height = window.innerHeight // * 0.9

  camera.aspect = width / height
  camera.updateProjectionMatrix()

  renderer.setSize(width, height)
}

const managePosition = (
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

export const applyRandomMesh = (
  obj: THREE.Object3D,
  texture: any,
  hdrEquirect: THREE.Texture
) => {
  texture &&
    obj.traverse(function (child) {
      child.addEventListener('click', (a: any) => {
        console.log('click')
      })
      if (child instanceof THREE.Mesh) {
        // child.material.map = texture;
        // child.material.needsUpdate = true;
        const r = Math.round(255 * Math.random())
        const g = Math.round(255 * Math.random())
        const b = Math.round(255 * Math.random())
        const randomColor = 'rgb(' + r + ', ' + g + ', ' + b + ')'
        child.material = new THREE.MeshPhysicalMaterial({
          color: randomColor,
          metalness: meshParams.metalness,
          roughness: meshParams.roughness,
          ior: meshParams.ior,
          alphaMap: texture,
          envMap: hdrEquirect,
          envMapIntensity: meshParams.envMapIntensity,
          transmission: meshParams.transmission, // use material.transmission for glass materials
          specularIntensity: meshParams.specularIntensity,
          specularColor: meshParams.specularColor,
          opacity: meshParams.opacity,
          side: THREE.DoubleSide,
          transparent: true,
        })
        // actions.addComponent(child)
        sceneMeshes.push(child)
      } else {
        // console.log("Not managed", child);
      }
    })
}

export const use3DViewer = (mount: HTMLDivElement | undefined, objId = '') => {
  console.log('use3DViewer', objId)
  // const c = catalog.find((c: { objId: string }) => c.objId === objId) || {}
  const c = {
    object: {
      path: '/models/obj/',
      fileName: 'lego.json',
      type: 'json',
    },
    background: {
      // da rimuovere per /configurator
      path: '/models/textures/',
      fileName: 'pedestrian_overpass_1k.hdr',
    },
  }
  const { object, background } = c

  // load hdr equirectangular texture for environment mapping
  loadRGBE(
    background?.path || '/models/textures/',
    background?.fileName || 'pedestrian_overpass_1k.hdr'
  ).then(hdrEquirect => {
    // load object model .obj
    console.log(object?.type)
    Promise.all([
      // loadObj("/models/obj/", "lego.obj"),
      // loadFBX("/models/fbx/", "Fruttiera2.fbx"),
      // loadFBX("/models/fbx/", "Fruttiera.fbx"),
      object?.type === 'obj' || !object?.type
        ? loadObj(
            object?.path || '/models/obj/',
            object?.fileName || 'lego.obj'
          )
        : object.type === 'json'
        ? loadObject(
            object?.path || '/models/obj/',
            object?.fileName || 'lego.json'
          )
        : loadFBX(
            object?.path || '/models/fbx/',
            object?.fileName || 'Fruttiera.fbx'
          ),
    ]).then(([obj /*, fbx, fbx2*/]) => {
      // loadObj("./models/obj/", "lego.obj").then((obj) => {
      // loadFBX("./models/fbx/", "Fruttiera2.fbx").then((obj) => {
      obj.rotation.set(0, 90, 0)
      // apply random mesh color to object model
      applyRandomMesh(obj, texture, hdrEquirect)
      // create and configure renderer
      renderer = new THREE.WebGLRenderer({ antialias: true })
      renderer.setPixelRatio(window.devicePixelRatio)
      renderer.setSize(_WIDTH, _HEIGHT)
      renderer.shadowMap.enabled = true
      renderer.toneMapping = THREE.ACESFilmicToneMapping
      renderer.toneMappingExposure = meshParams.exposure
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
      managePosition(obj, camera, controls)

      // ANIMATE
      const animate = () => {
        requestAnimationFrame(animate)
        if (obj) obj.rotation.y -= 0.006
        // required if controls.enableDamping or controls.autoRotate are set to true
        controls.update()
        renderer.render(scene, camera)
      }

      animate()

      window.addEventListener('resize', _onWindowResize)
    })
  })
}
