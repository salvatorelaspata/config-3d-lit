import {React, ReactDOM} from './react.js';
import {createComponent} from '@lit-labs/react';
import {Viewer3d, Viewer3dReact} from '../viewer-3d-lit.js';
const DemoGreeting = createComponent(
  React,
  'viewer-3d-lit',
  Viewer3d
);

const node = document.querySelector('#app');
const root = ReactDOM.createRoot(node!);

root.render(<Viewer3dReact />);
