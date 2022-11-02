import { LitElement } from 'lit';
import { Viewer3dType } from './types/types';
export declare class Viewer3d extends LitElement {
    modelConfig: Viewer3dType;
    mount: HTMLDivElement | undefined;
    scene: {
        obj: unknown;
        hdrEquirect: unknown;
        texture: unknown;
    };
    isLoaded: boolean;
    firstUpdated(): void;
    onClickViewer(e: MouseEvent): void;
    render(): import("lit-html").TemplateResult<1>;
    static styles: import("lit").CSSResult;
}
declare global {
    interface HTMLElementTagNameMap {
        'viewer-3d-lit': Viewer3d;
    }
}
//# sourceMappingURL=viewer-3d-lit.d.ts.map