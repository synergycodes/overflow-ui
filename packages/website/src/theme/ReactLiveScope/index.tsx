import React from 'react';
import * as axiom from '@synergycodes/axiom';
import { ReactFlow, ReactFlowProvider } from '@xyflow/react';
import { User, Plus, Check } from '@phosphor-icons/react';

// Add react-live imports you need here
const ReactLiveScope = {
  React,
  ...React,
  ...axiom,
  ReactFlow,
  ReactFlowProvider,
  User,
  Plus,
  Check,
};

export default ReactLiveScope;
