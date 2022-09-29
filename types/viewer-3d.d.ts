import { LitElement } from 'lit'

// declare lit type
export declare class Viewer3d extends LitElement {
  appKey: string
  appSecret: string
  title: string
  description: string
  showContentDetail: boolean
  modelConfig: Object
  private onClickViewer
  render(): import('lit').TemplateResult<1>
}
