// eslint-disable-next-line no-restricted-syntax
import ReactLiveScope from '../../src/theme/ReactLiveScope';

declare global {
  const {
    // React Core
    useState,
    useEffect,
    useMemo,
    useCallback,

    // UI Components
    Avatar,
    Checkbox,
    CharacterCounter,
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
    applyEdgeChanges,
    applyNodeChanges,
    addEdge,
    // @ts-expect-error - Still provides good type hints
  } = ReactLiveScope;
}
