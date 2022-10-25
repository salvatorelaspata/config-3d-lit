import { LitElement } from 'lit';
export declare class Viewer3d extends LitElement {
    modelConfig: Viewer3dType;
    mount: HTMLDivElement | undefined;
    scene: {
        obj: any;
        hdrEquirect: any;
        texture: any;
    };
    isLoaded: boolean;
    firstUpdated(): void;
    onClickViewer(e: MouseEvent): void;
    render(): import("lit-html").TemplateResult<1>;
    static styles: import("lit").CSSResult;
}
declare global {
    interface HTMLElementTagNameMap {
        'viewer-3d': Viewer3d;
    }
}
export declare const Viewer3dReact: import("@lit-labs/react").ReactWebComponent<Viewer3d, {
    onClickViewer: string;
}>;
