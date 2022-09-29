import { LitElement } from 'lit';
export declare class Viewer3d extends LitElement {
    appKey: string;
    appSecret: string;
    title: string;
    description: string;
    showContentDetail: boolean;
    modelConfig: Viewer3dType;
    show: boolean;
    mount: HTMLDivElement | undefined;
    firstUpdated(): void;
    _clickSlot(): void;
    onClickViewer(e: MouseEvent): void;
    render(): import("lit-html").TemplateResult<1>;
    static styles: import("lit").CSSResult;
}
declare global {
    interface HTMLElementTagNameMap {
        'viewer-3d': Viewer3d;
    }
}
