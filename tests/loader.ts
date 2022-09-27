// import assert from 'assert'
// import { CanvasTexture } from 'three'

// const modelConfig = {
//   modelFBX: {
//     path: '/models/obj/',
//     fileName: 'lego.obj',
//     type: 'obj',
//   },
//   modelOBJ: {
//     path: '/models/fbx/',
//     fileName: 'Fruttiera.fbx',
//     type: 'fbx',
//   },
//   modelJSON: {
//     path: '/models/obj/',
//     fileName: 'lego.json',
//     type: 'json',
//   },
//   texture: {
//     path: 'https://cdn.pixabay.com/photo/2018/02/24/11/09/', // '/models/textures/', //
//     fileName: 'background-3177833_960_720.jpg', // 'PignaOC.png', //
//   },
//   background: {
//     path: '/models/textures/',
//     fileName: 'studio_small_09_4k.hdr',
//   },
// }

// describe('Loader Works', function () {
//   const { modelFBX, modelOBJ, modelJSON, texture, background } = modelConfig

//   // all loader (.rgbe, .png)
//   it('load RGBE     - .hdr', async () => {
//     const rgbe = await loadRGBE(background.path, background.fileName)
//     // assert.doesNotReject()
//     // assert.doesNotThrow()
//     assert.equal(!!rgbe, true)
//   })

//   it('load Texture  - .png', async () => {
//     const t = await loadAsyncTexture(texture.path, texture.fileName)
//     // assert.doesNotReject()
//     // assert.doesNotThrow()
//     assert.equal(!!t, true)
//   })

//   it('load Generate - THREE.CanvasTexture', () => {
//     const generated = generateTexture()
//     assert.equal(typeof generated, CanvasTexture)
//   })

//   // loader model (.json, .obj, .fbx)
//   // it('load JSON model - ', () => {
//   //   loadModel(modelJSON)
//   // })

//   // it('load JSON model - ', () => {
//   //   loadModel(modelOBJ)
//   // })

//   // it('load JSON model - ', () => {
//   //   loadModel(modelFBX)
//   // })

//   // create material with custom texture (THREE.MeshPhysicalMaterial)
//   // create material with texture generated (THREE.MeshPhysicalMaterial)
// })
