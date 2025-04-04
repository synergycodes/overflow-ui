import React from 'react';
import * as axiom from '@axiom/ui';

// Add react-live imports you need here
const ReactLiveScope: unknown = {
  React,
  ...React,
  ...axiom,
};

export default ReactLiveScope;
