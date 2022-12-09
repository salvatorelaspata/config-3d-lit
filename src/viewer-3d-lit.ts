import * as THREE from 'three'
import { LitElement, html, css } from 'lit'
import { customElement, property, query } from 'lit/decorators.js'
import { classMap } from 'lit/directives/class-map.js'
import { applyTextureOnMesh, use3DViewer } from './hook/use3DViewer.js'

@customElement('viewer-3d-lit')
export class Viewer3d extends LitElement {
  // the path is local or remote
  // if texture is not defined, a default texture is applied (generateTexture)
  @property({ type: String })
  object = '/models/obj/PignaOC.obj'
  @property({ type: String })
  texture = '/models/textures/PignaOC.png'
  @property({ type: String })
  background = '/models/textures/studio_small_09_4k.hdr'

  // React - useRef
  @query('#viewer')
  mount: HTMLDivElement | undefined

  // React - useState
  @property({ type: Object, state: true })
  scene: { obj: unknown; hdrEquirect: unknown; texture: unknown } = {
    obj: null,
    hdrEquirect: null,
    texture: null,
  }

  @property({ type: Boolean, state: true })
  isLoaded = false

  // React - componentDidMount | useEffect
  override firstUpdated() {
    const aUse = async () => {
      const { obj, hdrEquirect, texture } = await use3DViewer(this.mount, {
        object: {
          path: this.object,
          fileName: '',
          type: this._getExtension(this.object), // fbx, obj, json
        },
        texture: {
          path: this.texture,
          fileName: '',
        },
        background: {
          path: this.background,
          fileName: '',
        },
      })
      this.scene = { obj, hdrEquirect, texture }
      this.isLoaded = true
    }
    aUse()
  }

  _getExtension(path: string) {
    const extension = path.split('.').pop()?.toLocaleLowerCase()
    if (extension === 'obj') return 'obj'
    if (extension === 'fbx') return 'fbx'
    if (extension === 'json') return 'json'
    else throw new Error('Extension not supported')
  }

  onClickViewer(e: MouseEvent) {
    e.stopPropagation()
    const { obj, hdrEquirect, texture } = this.scene
    this.dispatchEvent(
      new CustomEvent('viewer-click', {
        bubbles: true,
        detail: applyTextureOnMesh(
          obj as THREE.Object3D,
          hdrEquirect as THREE.Texture,
          texture as THREE.Texture
        ),
      })
    )
  }

  override render() {
    console.log('isLoaded', this.isLoaded)
    return html`<div
        class=${classMap({ hidden: !this.isLoaded })}
        @click=${this.onClickViewer}
        id="viewer"
      ></div>
      <!-- Integrare percentuale -->
      <div class="${classMap({ hidden: this.isLoaded })} bg-loader">
        <div class="${classMap({ hidden: this.isLoaded })} loader">
          loading...
        </div>
      </div>`
  }

  static override styles = css`
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    :host {
      width: 100vw;
      height: 100vh;
      margin: 0 auto;
    }
    .hidden {
      display: none;
    }
    .bg-loader {
      background-color: #000;
      width: 100vw;
      height: 100vh;
      z-index: 999;
    }
    .loader {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      font-size: 2rem;
      color: red;
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
    'viewer-3d-lit': Viewer3d
  }
}
