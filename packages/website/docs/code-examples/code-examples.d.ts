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
    Menu,
    Modal,
    Radio,
    Select,
    Separator,
    Snackbar,
    Switch,
    TextArea,
    Tooltip,
    Button,
    NavButton,
    useEdgeStyle,
    EdgeLabel,
    Status,
    SegmentPicker,

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
    Calendar,
    AddressBook,

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
