import styles from './category.module.css';
import linkStyles from '../Link/link.module.css';
import { type ComponentProps, type ReactNode, useEffect, useMemo } from 'react';
import clsx from 'clsx';
import {
  useThemeConfig,
  usePrevious,
  Collapsible,
  useCollapsible,
} from '@docusaurus/theme-common';
import { isSamePath } from '@docusaurus/theme-common/internal';
import {
  isActiveSidebarItem,
  findFirstSidebarItemLink,
  useDocSidebarItemsExpandedState,
} from '@docusaurus/plugin-content-docs/client';
import Link from '@docusaurus/Link';
import useIsBrowser from '@docusaurus/useIsBrowser';
import DocSidebarItems from '@theme/DocSidebarItems';
import type { Props } from '@theme/DocSidebarItem/Category';
import { NavButton } from '@synergycodes/overflow-ui';
import { CaretRight, Lightning } from '@phosphor-icons/react';
import { customConfig } from '@site/custom.config';

export default function DocSidebarItemCategory({
  item,
  onItemClick,
  activePath,
  level,
  index,
  ...props
}: Props): ReactNode {
  const { items, label, collapsible, className, href } = item;

  const {
    docs: {
      sidebar: { autoCollapseCategories },
    },
  } = useThemeConfig();

  const { categoryIconMap } = customConfig;

  const hrefWithSSRFallback = useCategoryHrefWithSSRFallback(item);

  const isActive = isActiveSidebarItem(item, activePath);
  const isCurrentPage = isSamePath(href, activePath);

  const { collapsed, setCollapsed } = useCollapsible({
    // Active categories are always initialized as expanded. The default
    // (`item.collapsed`) is only used for non-active categories.
    initialState: () => {
      if (!collapsible) {
        return false;
      }
      return isActive ? false : item.collapsed;
    },
  });

  const { expandedItem, setExpandedItem } = useDocSidebarItemsExpandedState();
  // Use this instead of `setCollapsed`, because it is also reactive
  const updateCollapsed = (toCollapsed: boolean = !collapsed) => {
    setExpandedItem(toCollapsed ? null : index);
    setCollapsed(toCollapsed);
  };
  useAutoExpandActiveCategory({ isActive, collapsed, updateCollapsed });
  useEffect(() => {
    if (
      collapsible &&
      expandedItem != null &&
      expandedItem !== index &&
      autoCollapseCategories
    ) {
      setCollapsed(true);
    }
  }, [collapsible, expandedItem, index, setCollapsed, autoCollapseCategories]);

  const isTopLevel = level === 1;
  const IconComponent = categoryIconMap[item.label] ?? Lightning;

  return (
    <li
      className={clsx(
        {
          'menu__list-item--collapsed': collapsed,
        },
        className,
      )}
    >
      <div
        className={clsx(styles['category'], {
          [styles['top-level-category']]: isTopLevel,
        })}
        onClick={
          collapsible
            ? (e) => {
                onItemClick?.(item);

                if (href) {
                  updateCollapsed(false);
                } else {
                  e.preventDefault();
                  updateCollapsed();
                }
              }
            : () => {
                onItemClick?.(item);
              }
        }
      >
        <Link
          className={clsx(linkStyles['link'], {
            [linkStyles['active']]: isCurrentPage,
          })}
          aria-current={isCurrentPage ? 'page' : undefined}
          role={collapsible && !href ? 'button' : undefined}
          aria-expanded={collapsible && !href ? !collapsed : undefined}
          href={
            collapsible ? (hrefWithSSRFallback ?? '#') : hrefWithSSRFallback
          }
          {...props}
        >
          {isTopLevel && <IconComponent size={18} weight="bold" />}
          {label}
        </Link>
        {href && collapsible && (
          <CollapseButton
            collapsed={collapsed}
            categoryLabel={label}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              updateCollapsed();
            }}
          />
        )}
      </div>

      <Collapsible lazy as="ul" className="menu__list" collapsed={collapsed}>
        <DocSidebarItems
          items={items}
          tabIndex={collapsed ? -1 : 0}
          onItemClick={onItemClick}
          activePath={activePath}
          level={level + 1}
        />
      </Collapsible>
    </li>
  );
}

function CollapseButton({
  collapsed,
  onClick,
}: {
  collapsed: boolean;
  categoryLabel: string;
  onClick: ComponentProps<'button'>['onClick'];
}) {
  return (
    <NavButton
      className={clsx('nav-button', styles['collapse-button'], {
        [styles['collapsed']]: collapsed,
      })}
      transparent
      aria-expanded={!collapsed}
      onClick={onClick}
    >
      <CaretRight />
    </NavButton>
  );
}

// If we navigate to a category and it becomes active, it should automatically
// expand itself
function useAutoExpandActiveCategory({
  isActive,
  collapsed,
  updateCollapsed,
}: {
  isActive: boolean;
  collapsed: boolean;
  updateCollapsed: (b: boolean) => void;
}) {
  const wasActive = usePrevious(isActive);
  useEffect(() => {
    const justBecameActive = isActive && !wasActive;
    if (justBecameActive && collapsed) {
      updateCollapsed(false);
    }
  }, [isActive, wasActive, collapsed, updateCollapsed]);
}

/**
 * When a collapsible category has no link, we still link it to its first child
 * during SSR as a temporary fallback. This allows to be able to navigate inside
 * the category even when JS fails to load, is delayed or simply disabled
 * React hydration becomes an optional progressive enhancement
 * see https://github.com/facebookincubator/infima/issues/36#issuecomment-772543188
 * see https://github.com/facebook/docusaurus/issues/3030
 */
function useCategoryHrefWithSSRFallback(
  item: Props['item'],
): string | undefined {
  const isBrowser = useIsBrowser();
  return useMemo(() => {
    if (item.href && !item.linkUnlisted) {
      return item.href;
    }
    // In these cases, it's not necessary to render a fallback
    // We skip the "findFirstCategoryLink" computation
    if (isBrowser || !item.collapsible) {
      return undefined;
    }
    return findFirstSidebarItemLink(item);
  }, [item, isBrowser]);
}
