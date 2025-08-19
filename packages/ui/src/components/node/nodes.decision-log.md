# Node Components Design and Implementation

Proposed by: **Piotr Błaszczyk**

Date: **02.04.2025**

## Context

In the project, node components have been implemented to provide base parts that allow developers to build node templates on their own. Since the library does not have a direct dependency on React Flow, elements such as handles need to be provided as children. This ensures flexibility in defining the node structure.

Some nodes in the project may have one or more handles. Providing them as children allows for greater customization and control over their placement and behavior.

Several components have been designed to be used together or separately. They provide a well-structured foundation for quickly building visually appealing nodes.

## Decision

To meet these requirements, the following components were introduced:

1. **NodeAsPortWrapper**:

   - Any React Flow node can be wrapped with this component to make the entire node function as a port during connections.
   - This enables easy and efficient flow creation by simplifying how nodes interact with edges.

2. **NodePanel**:

   - A foundational building block for nodes.
   - Offers a well-designed interface for various states, leveraging the Overflow UI design system.
   - Accepts three slots as children for structuring the node: `header`, `content`, and `handles`.

3. **NodeIcon & NodeDescription**:

   - Small helper components for quickly creating a node header.
   - These components can also be reused in other parts of the application, such as palettes or the sidebar header properties.

## Usage Example

```tsx
<NodeAsPortWrapper isConnecting={false} targetPortPosition="top">
  <NodePanel selected={false}>
    <NodeHeaderSlot>
      <NodeIcon icon={<Icon name="Airplane" />} />
      <NodeDescription label="Trigger" description="Initiate task" />
    </NodeHeaderSlot>
    <NodeHandlesSlot isVisible={true}>
      <Handle id="target" position={Position.Top} type="target" />
      <Handle id="source" position={Position.Bottom} type="source" />
    </NodeHandlesSlot>
  </NodePanel>
</NodeAsPortWrapper>
```

## Consequences

- **Flexibility**: By not enforcing a direct React Flow dependency, the components can be used in various scenarios while still allowing full control over node structure.
- **Maintainability**: The modular nature of the components ensures easier updates and modifications.
- **Customizability**: Providing handles and other elements as children allows for tailored node definitions.
- **Reusability**: Common design elements such as headers and descriptions can be used across multiple parts of the application.

## Status

Accepted
