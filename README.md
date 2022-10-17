# VIEWER-3D

Viewer 3d is a simple 3d viewer for 3d models. It is based on three.js and is written in typescript.
Use to load and view 3d models in the browser.

# Use

import:
`<script type="module" src="/src/viewer-3d.ts"></script>`

```html
<viewer-3d {properties}> . . . ( not showing ) </viewer-3d>
```

## {properties}:

```typescript
  modelConfig type: Viewer3dType = {
    object: {
      path: string,
      fileName: string,
      type: type3D //fbx, obj, json
    },
    texture: {
      path: string,
      fileName: string
    },
    background: {
      path: string,
      fileName: string
    }
  }
```

The `modelConfig` property is required. It is an object that contains the path to the model, the path to the texture and the path to the background.

- `object` property is required - you can configure it in two ways.
  - type `{ path: string, fileName: string }` is an object that contains the path to the model, the name of the model and the type of model. You can download the model from cdn or locally.
  - type `THREE.Object3D` directly pass the model to the component.( \* )
- `texture` property is optional - you can configure it in two ways.
  - type `{ path: string, fileName: string }` is an object that contains the path to the texture and the name of the texture. You can download the model from cdn or locally.
  - type `THREE.Texture` directly pass the texture to the component.( \*\* )
- `background` property is optional - you can configure it in two ways.
  - type `{ path: string, fileName: string }` is an object that contains the path to the background and the name of the background. You can download the model from cdn or locally.
  - type `THREE.DataTexture` directly pass the background to the component.( \*\*\* )

## example

```typescript
modelConfig: Viewer3dType = {
  object: {
    path: '/models/obj/',
    fileName: 'PignaOC.obj',
    type: 'obj',
  },
  texture: {
    path: '/models/textures/',
    fileName: 'PignaOC.png',
  },
  background: {
    path: '/models/textures/',
    fileName: 'studio_small_09_4k.hdr',
  },
}
```

> ( \* ) --> [THREE.ObjectLoader](https://threejs.org/docs/#api/en/loaders/ObjectLoader)
> ( \*\* ) --> [THREE.TextureLoader](https://threejs.org/docs/#api/en/loaders/TextureLoader)
> ( \*\*\* ) --> [THREE.DataTextureLoader](https://threejs.org/docs/#api/en/loaders/DataTextureLoader)

## Override Style

- --viewer-3d-primary --> primary color

- --viewer-3d-secondary --> secondary color

```html
<style>
  viewer-3d {
    --viewer-3d-primary: lightgreen;
    --viewer-3d-secondary: red;
  }
</style>
```

## Custom Event

If is in the

- viewer-click (event sample)

```html
<script>
  const el = document.querySelector('viewer-3d')
  el.addEventListener('viewer-click', () => {
    console.log('viewer-click')
  })
</script>
```
