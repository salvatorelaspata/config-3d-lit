var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html, css } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
// import React from 'react'
import { applyTextureOnMesh, use3DViewer } from './hook/use3DViewer';
let Viewer3d = class Viewer3d extends LitElement {
    constructor() {
        super(...arguments);
        // modelConfig: Viewer3dType
        // the path is local or remote
        // if texture is not defined, a default texture is applied (generateTexture)
        this.modelConfig = {
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
        };
        // React - useState
        this.scene = {
            obj: null,
            hdrEquirect: null,
            texture: null,
        };
        this.isLoaded = false;
    }
    // React - componentDidMount | useEffect
    firstUpdated() {
        const aUse = async () => {
            const { obj, hdrEquirect, texture } = await use3DViewer(this.mount, this.modelConfig);
            this.scene = { obj, hdrEquirect, texture };
            this.isLoaded = true;
        };
        aUse();
    }
    onClickViewer(e) {
        e.stopPropagation();
        const { obj, hdrEquirect, texture } = this.scene;
        this.dispatchEvent(new CustomEvent('viewer-click', {
            bubbles: true,
            detail: applyTextureOnMesh(obj, hdrEquirect, texture),
        }));
    }
    render() {
        console.log('isLoaded', this.isLoaded);
        return html `<div
        class=${classMap({ hidden: !this.isLoaded })}
        @click=${this.onClickViewer}
        id="viewer"
      ></div>
      <!-- Integrare percentuale -->
      <div class="${classMap({ hidden: this.isLoaded })} bg-loader">
        <div class="${classMap({ hidden: this.isLoaded })} loader">
          loading...
        </div>
      </div>`;
    }
};
Viewer3d.styles = css `
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
  `;
__decorate([
    property({ type: Object })
], Viewer3d.prototype, "modelConfig", void 0);
__decorate([
    query('#viewer')
], Viewer3d.prototype, "mount", void 0);
__decorate([
    property({ type: Object, state: true })
], Viewer3d.prototype, "scene", void 0);
__decorate([
    property({ type: Boolean, state: true })
], Viewer3d.prototype, "isLoaded", void 0);
Viewer3d = __decorate([
    customElement('viewer-3d-lit')
], Viewer3d);
export { Viewer3d };
// export const Viewer3dReact = createComponent(React, 'viewer-3d-lit', Viewer3d, {
//   onClickViewer: 'viewer-click',
// })
//# sourceMappingURL=viewer-3d-lit.js.map