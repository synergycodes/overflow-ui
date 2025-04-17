import clsx from 'clsx';
import nodeStyles from './node-panel.module.css';
import handleStyles from './handle.module.css';

import {
  Children,
  isValidElement,
  PropsWithChildren,
  useMemo,
  memo,
} from 'react';

type Props = {
  /** Whether the node panel is selected */
  selected: boolean;
  /** The content of the node panel */
  children?: React.ReactNode;
};

/**
 * Node Panel component
 *
 * This component ensures a structured layout with optional slots:
 * - `NodePanel.Header`: A container for the node's header (at most 1).
 * - `NodePanel.Content`: A container for the node's main content (at most 1).
 * - `NodePanel.Handles`: A container for action handles (at most 1).
 *
 * **Usage Example**
 * ```tsx
 * <NodePanel.Root selected={true}>
 *   <NodePanel.Header>Header Content</NodeHeaderSlot>
 *   <NodePanel.Content>Main Content</NodeContentSlot>
 *   <NodePanel.Handles>Handles</NodeHandlesSlot>
 * </NodePanel.Root>
 * ```
 *
 * **Allowed Combinations:**
 * - No children (empty node)
 * - Header only, Content only, Handles only
 * - Any combination of Header, Content, and Handles (but max 1 each)
 *
 * **Invalid Cases (Throws a Runtime Warning):**
 * - More than one instance of `NodePanel.Header`, `<NodePanel.Content`, or `NodePanel.Handles`
 * - Passing an unknown child element
 */

const Header = memo(function Header({
  children,
  className,
}: PropsWithChildren<{ className?: string }>) {
  return (
    <div className={clsx(nodeStyles['header-container'], className)}>
      {children}
    </div>
  );
});

const Content = memo(function Content({
  children,
  className,
}: PropsWithChildren<{ className?: string }>) {
  return (
    <div className={clsx(nodeStyles['content-container'], className)}>
      {children}
    </div>
  );
});

const Handles = memo(function Handles({
  children,
  isVisible = true,
}: PropsWithChildren<{ isVisible?: boolean }>) {
  return <>{isVisible && children}</>;
});

const Root = memo(function Root({ selected, children }: Props) {
  const { header, content, handles } = useMemo(() => {
    const childrenArray = Children.toArray(children);

    const header = findChild(childrenArray, NodePanel.Header);
    const content = findChild(childrenArray, NodePanel.Content);
    const handles = findChild(childrenArray, NodePanel.Handles);

    validateChildren(childrenArray, header, content, handles);

    return {
      header,
      content,
      handles,
    };
  }, [children]);

  return (
    <div
      className={clsx(
        handleStyles['handle-container'],
        nodeStyles['container'],
      )}
    >
      <div
        className={clsx(nodeStyles['inner-container'], {
          [nodeStyles['selected']]: selected,
        })}
      >
        {header}
        {content}
        {handles}
      </div>
    </div>
  );
});

export const NodePanel = {
  Root,
  Header,
  Content,
  Handles,
};

function findChild(
  childrenArray: ReturnType<typeof Children.toArray>,
  element:
    | typeof NodePanel.Header
    | typeof NodePanel.Content
    | typeof NodePanel.Handles,
) {
  return childrenArray.find(
    (child) => isValidElement(child) && child.type === element,
  );
}

function validateChildren(
  childrenArray: ReturnType<typeof Children.toArray>,
  header: React.ReactNode,
  content: React.ReactNode,
  handles: React.ReactNode,
) {
  const totalValidChildren =
    (header ? 1 : 0) + (content ? 1 : 0) + (handles ? 1 : 0);
  const totalChildren = childrenArray.length;

  if (totalChildren > totalValidChildren) {
    console.warn(
      `NodePanel.Root: Unknown children detected. Only NodePanel.Header, NodePanel.Content, and NodePanel.Handles are allowed. ` +
        `Each of these components can be used 0 or 1 time only.`,
    );
  }
}
