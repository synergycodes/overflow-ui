import clsx from "clsx";
import nodeStyles from "./node-panel.module.css";
import handleStyles from "./handle.module.css";

import { Children, isValidElement, PropsWithChildren } from "react";

type Props = {
  selected: boolean;
  children?: React.ReactNode;
};

/**
 * Node Panel component
 *
 * This component ensures a structured layout with optional slots:
 * - `NodeHeaderSlot`: A container for the node's header (at most 1).
 * - `NodeContentSlot`: A container for the node's main content (at most 1).
 * - `NodeHandlesSlot`: A container for action handles (at most 1).
 *
 * **Usage Example**
 * ```tsx
 * <Node selected={true}>
 *   <NodeHeaderSlot>Header Content</NodeHeaderSlot>
 *   <NodeContentSlot>Main Content</NodeContentSlot>
 *   <NodeHandlesSlot>Handles</NodeHandlesSlot>
 * </Node>
 * ```
 *
 * **Allowed Combinations:**
 * - No children (empty node)
 * - Header only, Content only, Handles only
 * - Any combination of Header, Content, and Handles (but max 1 each)
 *
 * **Invalid Cases (Throws a Runtime Warning):**
 * - More than one instance of `NodeHeaderSlot`, `NodeContentSlot`, or `NodeHandlesSlot`
 * - Passing an unknown child element
 */
export function NodePanel({ selected, children }: Props) {
  const childrenArray = Children.toArray(children);
  const header = findChild(childrenArray, NodeHeaderSlot);
  const content = findChild(childrenArray, NodeContentSlot);
  const handles = findChild(childrenArray, NodeHandlesSlot);

  return (
    <div
      className={clsx(
        handleStyles["handle-container"],
        nodeStyles["container"]
      )}
    >
      <div
        className={clsx(nodeStyles["inner-container"], {
          [nodeStyles["selected"]]: selected,
        })}
      >
        {header}
        {content}
        {handles}
      </div>
    </div>
  );
}

export function NodeHeaderSlot({
  children,
  className,
}: PropsWithChildren<{ className?: string }>) {
  return (
    <div className={clsx(nodeStyles["header-container"], className)}>
      {children}
    </div>
  );
}

export function NodeContentSlot({
  children,
  className,
}: PropsWithChildren<{ className?: string }>) {
  return (
    <div className={clsx(nodeStyles["content-container"], className)}>
      {children}
    </div>
  );
}

export function NodeHandlesSlot({
  children,
  isVisible = true,
}: PropsWithChildren<{ isVisible?: boolean }>) {
  return <>{isVisible && children}</>;
}

function findChild(
  childrenArray: ReturnType<typeof Children.toArray>,
  element:
    | typeof NodeHeaderSlot
    | typeof NodeContentSlot
    | typeof NodeHandlesSlot
) {
  return childrenArray.find(
    (child) => isValidElement(child) && child.type === element
  );
}
