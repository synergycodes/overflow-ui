import clsx from 'clsx';
import { ExclamationMark } from '@phosphor-icons/react';
import nodeStyles from './node-panel.module.css';
import handleStyles from './handle.module.css';

import {
  Children,
  isValidElement,
  type PropsWithChildren,
  useMemo,
  memo,
} from 'react';

type Props = {
  selected: boolean;
  children?: React.ReactNode;
};

export type ValidationStatus = 'invalid';

const Status = memo(function Status({
  validationStatus,
  className,
}: {
  validationStatus?: ValidationStatus;
  className?: string;
}) {
  if (!validationStatus) {
    return null;
  }

  return (
    <span
      className={clsx(
        nodeStyles['status-container'],
        {
          [nodeStyles['status-container--invalid']]:
            validationStatus === 'invalid',
        },
        className,
      )}
    >
      <ExclamationMark />
    </span>
  );
});

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

/**
 * Node Panel component
 *
 * This component ensures a structured layout with optional slots:
 * - `NodePanel.Status`: A container for the node's status (at most 1).
 * - `NodePanel.Header`: A container for the node's header (at most 1).
 * - `NodePanel.Content`: A container for the node's main content (at most 1).
 * - `NodePanel.Handles`: A container for action handles (at most 1).
 *
 * **Usage Example**
 * ```tsx
 * <NodePanel.Root selected={true}>
 *   <NodePanel.Status>Header Content</NodePanel.Status>
 *   <NodePanel.Header>Header Content</NodePanel.Header>
 *   <NodePanel.Content>Main Content</NodePanel.Content>
 *   <NodePanel.Handles>Handles</NodePanel.Handles>
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
const Root = memo(function Root({ selected, children }: Props) {
  const { status, header, content, handles } = useMemo(() => {
    const childrenArray = Children.toArray(children);

    const status = findChild(childrenArray, NodePanel.Status);
    const header = findChild(childrenArray, NodePanel.Header);
    const content = findChild(childrenArray, NodePanel.Content);
    const handles = findChild(childrenArray, NodePanel.Handles);

    validateChildren(childrenArray, status, header, content, handles);

    return {
      status,
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
        {status}
        {header}
        {content}
        {handles}
      </div>
    </div>
  );
});

export const NodePanel = {
  Root,
  Status,
  Header,
  Content,
  Handles,
};

function findChild(
  childrenArray: ReturnType<typeof Children.toArray>,
  element:
    | typeof NodePanel.Status
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
  status: React.ReactNode,
  header: React.ReactNode,
  content: React.ReactNode,
  handles: React.ReactNode,
) {
  const totalValidChildren =
    (status ? 1 : 0) + (header ? 1 : 0) + (content ? 1 : 0) + (handles ? 1 : 0);
  const totalChildren = childrenArray.length;

  if (totalChildren > totalValidChildren) {
    console.warn(
      `NodePanel.Root: Unknown children detected. Only NodePanel.Header, NodePanel.Content, and NodePanel.Handles are allowed. ` +
        `Each of these components can be used 0 or 1 time only.`,
    );
  }
}
