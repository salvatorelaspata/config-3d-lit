import { createComponent } from '@lit-labs/react'
import { LitElement, css, html } from 'lit'
import { customElement, property, query } from 'lit/decorators.js'
import { classMap } from 'lit/directives/class-map.js'
import React from 'react'
import { applyTextureOnMesh, use3DViewer } from './hook/use3DViewer'

@customElement('viewer-3d')
export class Viewer3d extends LitElement {
  // modelConfig: Viewer3dType
  // the path is local or remote
  // if texture is not defined, a default texture is applied (generateTexture)
  @property({ type: Object })
  modelConfig: Viewer3dType = {
    object: {
      path: '/models/obj/',
      fileName: 'PignaOC.obj',
      type: 'obj', // fbx, obj, json
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

  // React - useRef
  @query('#viewer')
  mount: HTMLDivElement | undefined

  // React - useState
  @property({ type: Object, state: true })
  scene: { obj: any; hdrEquirect: any; texture: any } = {
    obj: null,
    hdrEquirect: null,
    texture: null,
  }

  @property({ type: Boolean, state: true })
  isLoaded = false

  // React - componentDidMount | useEffect
  firstUpdated() {
    const aUse = async () => {
      const { obj, hdrEquirect, texture } = await use3DViewer(
        this.mount,
        this.modelConfig
      )
      this.scene = { obj, hdrEquirect, texture }
      this.isLoaded = true
    }
    aUse()
  }

  onClickViewer(e: MouseEvent) {
    e.stopPropagation()
    const { obj, hdrEquirect, texture } = this.scene
    this.dispatchEvent(
      new CustomEvent('viewer-click', {
        bubbles: true,
        detail: applyTextureOnMesh(obj, hdrEquirect, texture),
      })
    )
  }

  render() {
    return html`<div
        class=${classMap({ hidden: this.isLoaded })}
        @click=${this.onClickViewer}
        id="viewer"
      ></div>
      <!-- Integrare percentuale -->
      <div
        class=${classMap({ loader: !this.isLoaded, hidden: !this.isLoaded })}
      >
        loading...
      </div>`
  }

  static styles = css`
    :host {
      width: 100vw;
      height: 100vh;
      margin: 0 auto;
    }
    .loader {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      font-size: 2rem;
      color: #fff;
    }
    .noselect {
      -webkit-touch-callout: none; /* iOS Safari */
      -webkit-user-select: none; /* Safari */
      -khtml-user-select: none; /* Konqueror HTML */
      -moz-user-select: none; /* Old versions of Firefox */
      -ms-user-select: none; /* Internet Explorer/Edge */
      user-select: none; /* Non-prefixed version, currently
                            supported by Chrome, Edge, Opera and Firefox */
    }

    @media (prefers-color-scheme: light) {
    }
  `
}

declare global {
  interface HTMLElementTagNameMap {
    'viewer-3d': Viewer3d
  }
}

export const Viewer3dReact = createComponent(React, 'viewer-3d', Viewer3d, {
  onClickViewer: 'viewer-click',
})
