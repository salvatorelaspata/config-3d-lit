import { CSSResultGroup, LitElement } from 'lit'
import React from 'react'

// declare lit type
export declare class Viewer3d extends LitElement {
  static styles?: import('lit').CSSResult
  modelConfig: Object
  private onClickViewer
  render(): import('lit').TemplateResult<1>
}

declare global {
  interface HTMLElementTagNameMap {
    'viewer-3d': Viewer3d
  }
}

export declare const Viewer3dReact: React.ForwardRefExoticComponent<
  Partial<Omit<Viewer3d>>
> &
  Omit<React.HTMLAttributes<HTMLElement>, 'onClickViewer'> & {
    children?: React.ReactNode
  } & React.RefAttributes<unknown>
