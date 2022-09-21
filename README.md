# VIEWER-3D

Lit Web Component

# Use

`<viewer-3d>`

```
  appKey              type: String    default: ''
  appSecret           type: String    default: ''
  title               type: String    default: 'VIEWER-3D'
  description         type: String    default: 'Viewer 3d model (.obj, .fbx, .json (*))'
  showContentDetail   type: Boolean   default: true
  modelConfig         type: Viewer3d  default: {
    object: {
      path: '/models/obj/',
      fileName: 'lego.json',
      type: 'json'
    },
    background: {
      path: '/models/textures/',
      fileName: 'pedestrian_overpass_1k.hdr'
    }
  }
```

> (\*) --> [THREE.ObjectLoader](https://threejs.org/docs/#api/en/loaders/ObjectLoader)
