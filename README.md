# VIEWER-3D

Lit Web Component

# Use

import:
`<script type="module" src="/src/viewer-3d.ts"></script>`

```html
<viewer-3d {properties}> . . . ( not showing ) </viewer-3d>
```

## {properties}:

```typescript
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

> ( \* ) --> [THREE.ObjectLoader](https://threejs.org/docs/#api/en/loaders/ObjectLoader)

## Override Style

- --viewer-3d-primary --> primary color

- --viewer-3d-secondary --> secondary color

```html
<style>
  viewer-3d {
    --viewer-3d-primary: lightgreen;
    --viewer-3d-secondary: red;
  }
</stile>
```

## Custom Event

- viewer-click (event sample)

```html
<script>
  const el = document.querySelector('viewer-3d')
  el.addEventListener('viewer-click', () => {
    console.log('viewer-click')
  })
</script>
```
