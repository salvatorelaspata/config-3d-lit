import { LitElement, css, html } from 'lit'
import { customElement, property, query } from 'lit/decorators.js'
import { when } from 'lit/directives/when.js'
import { use3DViewer } from './hook/use3DViewer'

@customElement('viewer-3d')
export class Viewer3d extends LitElement {
  @property({ type: String })
  appKey = ''
  @property({ type: String })
  appSecret = ''
  @property({ type: String })
  title = 'VIEWER-3D'
  @property({ type: String })
  description = ''
  @property({ type: Boolean })
  showContentDetail = false
  @property({ type: Object })
  modelConfig: Viewer3dType = {
    object: {
      path: '/models/obj/',
      fileName: 'lego.obj',
      type: 'obj',
    },
    texture: {
      path: 'https://cdn.pixabay.com/photo/2018/02/24/11/09/', // '/models/textures/', //
      fileName: 'background-3177833_960_720.jpg', // 'PignaOC.png', //
    },
    background: {
      path: '/models/textures/',
      fileName: 'studio_small_09_4k.hdr',
    },
  }
  @property({ type: Boolean, state: true })
  show = false

  // React - useRef
  @query('#viewer')
  mount: HTMLDivElement | undefined

  // React - componentDidMount | useEffect
  firstUpdated() {
    use3DViewer(this.mount, this.modelConfig)
  }
  _clickSlot() {
    this.show = !this.show
  }
  onClickViewer(e: MouseEvent) {
    e.stopPropagation()
    this.dispatchEvent(new CustomEvent('viewer-click', { bubbles: true }))
  }
  render() {
    return html`<div @click=${this.onClickViewer} id="viewer"></div>
      ${when(
        this.showContentDetail,
        () =>
          html`${when(
            this.show,
            () =>
              html`<div class="slot">
                <div class="dot" @click=${this._clickSlot}>
                  <span class="noselect">ⅹ</span>
                </div>
                <div class="slot-container">
                  <!-- <slot></slot> -->
                  <h1 class="slot-title">${this.title}</h1>
                  ${when(
                    this.description,
                    () => html`<p>${this.description}</p>`
                  )}
                </div>
              </div>`,
            () =>
              html`<div class="slot dot" @click=${this._clickSlot}>
                <span class="noselect">ℹ</span>
              </div>`
          )}`
      )}`
  }

  static styles = css`
    :host {
      width: 100vw;
      height: 100vh;
      margin: 0 auto;
    }
    .slot {
      background: var(--viewer-3d-primary, #ffffff);
      color: var(--viewer-3d-secondary, #242424);
      position: absolute;
      width: 25%;
      border-radius: 2rem;
      top: 1rem;
      left: 1rem;
      display: flex;
      justify-content: space-between;
    }
    .slot-container {
      display: flex;
      flex-direction: column;
      text-align: inherit;
      margin: 1.5rem;
      font-family: monospace;
      width: 100%;
    }
    .slot-title {
      text-align: right;
      font-family: monospace;
    }
    .dot {
      height: 3rem;
      width: 3rem;
      position: absolute;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 50%;
      background: var(--viewer-3d-secondary, #242424);
      cursor: pointer;
    }
    .dot > span {
      color: var(--viewer-3d-primary, #ffffff);
      font-size: 2rem;
    }
    #viewer {
      display: flex;
      align-items: center;
      justify-content: center;
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
