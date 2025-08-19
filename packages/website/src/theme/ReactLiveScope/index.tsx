import React from 'react';
import * as overflowUI from '@synergycodes/overflow-ui';
import * as xyflow from '@xyflow/react';
import {
  User,
  Plus,
  Check,
  Trash,
  DiamondsFour,
  Calendar,
  AddressBook,
} from '@phosphor-icons/react';

const icons = {
  Trash,
  User,
  Plus,
  Check,
  DiamondsFour,
  Calendar,
  AddressBook,
} as const;

// Add react-live imports you need here
const ReactLiveScope = {
  ...React,
  ...overflowUI,
  ...xyflow,
  ...icons,
} as const;

export default ReactLiveScope;
