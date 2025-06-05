// eslint-disable-next-line no-restricted-syntax
import ReactLiveScope from '../../src/theme/ReactLiveScope';
declare global {
  const {
    // React Core
    useState,
    useEffect,
    useMemo,
    useCallback,
    createContext,
    useContext,

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
    IconButton,
    IconLabelButton,
    NavButton,
    useEdgeStyle,
    EdgeLabel,
    SegmentPicker,
    SegmentPickerOption,

    // Node Components
    NodeDescription,
    NodeIcon,
    NodePanel,

    // Icons
    Check,
    Plus,
    Trash,
    User,
    DiamondsFour,

    // React Flow
    ReactFlow,
    ReactFlowProvider,
    applyEdgeChanges,
    applyNodeChanges,
    addEdge,
    getBezierPath,
    BaseEdge,
    EdgeLabelRenderer,
    // @ts-expect-error - Still provides good type hints
  } = ReactLiveScope;
}
