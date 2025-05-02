// eslint-disable-next-line no-restricted-syntax
import ReactLiveScope from '../../src/theme/ReactLiveScope';

type Scope = typeof ReactLiveScope;

declare global {
  const {
    // React Core
    useState,
    useEffect,

    // UI Components
    Avatar,
    Checkbox,
    DatePicker,
    Input,
    LabelButton,
    Menu,
    Modal,
    Radio,
    Select,
    Separator,
    Snackbar,
    Switch,
    TextArea,
    Tooltip,

    // Node Components
    NodeDescription,
    NodeIcon,
    NodePanel,

    // Icons
    Check,
    Plus,
    Trash,
    User,

    // React Flow
    ReactFlow,
    ReactFlowProvider,
    // @ts-expect-error - Still provides good type hints
  } = ReactLiveScope;
}
