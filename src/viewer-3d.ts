import { LitElement, css, html } from 'lit'
import { customElement, property, query } from 'lit/decorators.js'
import { use3DViewer } from './hook/use3DViewer'

@customElement('viewer-3d')
export class Viewer3d extends LitElement {
  @property({ type: String })
  objId = '7c7b8d1a-b7af-4c74-b1e3-a3202052d6f1'

  @property({ type: Boolean })
  showContentDetail = false

  @query('#viewer')
  mount: HTMLDivElement | undefined

  // React componentDidMount
  firstUpdated() {
    use3DViewer(this.mount, this.objId)
  }

  render() {
    console.log(this.mount)
    if (this.mount) use3DViewer(this.mount, this.objId)
    return html`
      <div>
        <div class="slot" ${!this.showContentDetail ? 'hidden' : ''}>
          <slot />
        </div>
        <div id="viewer" objId="${this.objId}" />
      </div>
    `
  }

  static styles = css`
    :host {
      width: 100vw;
      height: 100vh;
      margin: 0 auto;
    }
    .slot {
      background: white;
      color: #242424;
      position: absolute;
      width: 25%;
    }
    #viewer {
      background: red;
      display: flex;
      align-items: center;
      justify-content: center;
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
