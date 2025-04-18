import React from 'react';
import * as axiom from '@synergycodes/axiom';
import * as xyflow from '@xyflow/react';
import { User, Plus, Check } from '@phosphor-icons/react';

const icons = {
  User,
  Plus,
  Check,
};

// Add react-live imports you need here
const ReactLiveScope = {
  React,
  ...React,
  ...axiom,
  ...xyflow,
  ...icons,
};

export default ReactLiveScope;
