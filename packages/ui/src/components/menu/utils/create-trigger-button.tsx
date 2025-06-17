import { MenuButtonProps } from '@mui/base';
import {
  cloneElement,
  forwardRef,
  ForwardRefExoticComponent,
  ReactElement,
  RefAttributes,
} from 'react';

const cache = new WeakMap<
  ReactElement,
  { element: ReactElement; ref: unknown }
>();

/**
 * A helper function to simplify the creation of a menu trigger button.
 * It automatically assigns `props` and `ref` to the given `component`.
 * To optimize performance, it caches the cloned element and only clones it again
 * when the `component` or its `ref` changes.
 */
export function createTriggerButton(component: ReactElement) {
  return forwardRef<unknown, MenuButtonProps>(({ ...props }, ref) => {
    const cached = cache.get(component);
    if (cached && cached.ref === ref) {
      return cache.get(component)?.element;
    }

    const { children } = component.props as React.PropsWithChildren<unknown>;

    if (isForwardRefComponent(component)) {
      const element = cloneElement(component, {
        ...props,
        children,
        ref,
      } as MenuButtonProps);

      cache.set(component, { element, ref });

      return element;
    }

    console.error(
      'The element passed as children must be a valid React element with forwardRef',
    );

    return null;
  });
}

/**
 * Determines if a given React component is a forward-ref component.
 * The function checks if the component or any of its nested types
 * is wrapped in `forwardRef`. It recursively traverses through the component's
 * `type` to handle cases where the component may be memoized or wrapped multiple times.
 */
export function isForwardRefComponent<T>(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  component: any,
): component is ForwardRefExoticComponent<RefAttributes<T>> {
  const forwardRefSymbol = Symbol.for('react.forward_ref');

  while (component) {
    if (component.$$typeof === forwardRefSymbol) {
      return true;
    }
    component = component.type;
  }

  return false;
}
