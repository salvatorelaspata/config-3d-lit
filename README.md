# VIEWER-3D

Viewer 3d is a simple 3d viewer for 3d models. It is based on three.js and is written in typescript.
Use to load and view 3d models in the browser.

### Installing

`npm i viewer-3d-lit`

### Import

Importing in **HTML**

```html
<script type="module">
  import './node_modules/viewer-3d-lit/dist/viewer-3d-lit.js'
</script>
<!-- or -->
<script type="module" src="../dist/viewer-3d-lit.js"></script>
```

Importing in **React**

```javascript
import { Viewer3dReact } from '../../dist/viewer-3d-lit'
```

### Use

Using in **HTML**

```html
<viewer-3d
  object="models/obj/PignaOC.obj"
  texture="models/textures/PignaOC.png"
  background="models/textures/studio_small_09_4k.hdr"
>
  not showing (coming soon)
</viewer-3d>
```

Using in **ReactJS**

```javascript
const App = () => (
  <div>
    <Viewer3dReact
      object='models/obj/PignaOC.obj' // local dir or http endpoint
      texture='models/textures/PignaOC.png' // local dir or http endpoint
      background='models/textures/studio_small_09_4k.hdr' // local dir or http endpoint
    />
  </div>
)
```

Simple model:
[https://people.sc.fsu.edu/~jburkardt/data/obj/obj.html](https://people.sc.fsu.edu/~jburkardt/data/obj/obj.html)
Simple background:
[https://polyhaven.com/](https://polyhaven.com/)
[https://www.hdri-hub.com/hdrishop/freesamples/](https://www.hdri-hub.com/hdrishop/freesamples/)

> to use http approach in localhost and have **CORS error** launch chrome in disable-web-security mode
> `open -na Google\ Chrome --args --user-data-dir=/tmp/temporary-chrome-profile-dir --disable-web-security --disable-site-isolation-trials`

## {properties}:

```javascript
  object: "string",     // .obj | .fbx | .json  file
  texture: "string",    // .png                 file
  background: "string"  // .hdr                 file
```

- `object` property is required.
  - type `string` is the path that contains the model, the type of model is generated from extension. You can set the path from cdn or locally.
    Supported type:
    - type [THREE.Object3D](https://threejs.org/docs/index.html?q=Object3d#api/en/core/Object3D) directly pass the model to the component.( \* )
- `texture` property is optional - if you don't specify the texture is generated.
  - type `string` is the path that contains the model, the type of model is generated from extension. You can set the path from cdn or locally.
    Supported type:
    - type [THREE.Texture](https://threejs.org/docs/index.html?q=texture#api/en/textures/Texture) directly pass the model to the component.( \*\* )
- `background` property is optional - if you don't specify set the default backgrou
  - type `string` is the path that contains the model, the type of model is generated from extension. You can set the path from cdn or locally.
    Supported type:
    - type [THREE.DataTexture](https://threejs.org/docs/index.html?q=datatext#api/en/textures/DataTexture) directly pass the model to the component.( \*\*\* )

> ( \* ) --> [THREE.ObjectLoader](https://threejs.org/docs/#api/en/loaders/ObjectLoader)
>
> ( \*\* ) --> [THREE.TextureLoader](https://threejs.org/docs/#api/en/loaders/TextureLoader)
>
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
