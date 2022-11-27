import * as React from 'react'
import { createComponent } from '@lit-labs/react'
import { Viewer3d } from './viewer-3d-lit.js'

export const Viewer3dReact = createComponent(React, 'viewer-3d-lit', Viewer3d, {
  onClickViewer: 'viewer-click',
})
