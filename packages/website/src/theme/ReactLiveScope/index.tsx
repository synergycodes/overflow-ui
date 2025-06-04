import React from 'react';
import * as axiom from '@synergycodes/axiom';
import * as xyflow from '@xyflow/react';
import {
  User,
  Plus,
  Check,
  Trash,
  DiamondsFour,
  Link,
} from '@phosphor-icons/react';

const icons = {
  Trash,
  User,
  Plus,
  Check,
  DiamondsFour,
  Link,
} as const;

// Add react-live imports you need here
const ReactLiveScope = {
  ...React,
  ...axiom,
  ...xyflow,
  ...icons,
} as const;

export default ReactLiveScope;
