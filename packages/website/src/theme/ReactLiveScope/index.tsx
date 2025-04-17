import React from 'react';
import * as axiom from '@synergycodes/axiom';
import * as xyflow from '@xyflow/react';
import { User, Plus, Check } from '@phosphor-icons/react';
import { NodePanelExample } from '@site/docs/components/node/node-panel-example';

// Add react-live imports you need here
const ReactLiveScope = {
  React,
  ...React,
  ...axiom,
  ...xyflow,
  User,
  Plus,
  Check,
  NodePanelExample,
};

export default ReactLiveScope;
