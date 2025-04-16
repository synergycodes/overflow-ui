import React from 'react';
import * as axiom from '@synergycodes/axiom';

// Add react-live imports you need here
const ReactLiveScope: unknown = {
  React,
  ...React,
  ...axiom,
};

export default ReactLiveScope;
