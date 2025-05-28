import { type ReactNode } from 'react';
import clsx from 'clsx';
import { isActiveSidebarItem } from '@docusaurus/plugin-content-docs/client';
import Link from '@docusaurus/Link';
import isInternalUrl from '@docusaurus/isInternalUrl';
import IconExternalLink from '@theme/Icon/ExternalLink';
import type { Props } from '@theme/DocSidebarItem/Link';

import styles from './link.module.css';

export default function DocSidebarItemLink({
  item,
  onItemClick,
  activePath,
  ...props
}: Props): ReactNode {
  const { href, label, autoAddBaseUrl } = item;
  const isActive = isActiveSidebarItem(item, activePath);
  const isInternalLink = isInternalUrl(href);

  return (
    <li key={label}>
      <Link
        className={clsx(
          styles['link'],
          'menu__link',
          !isInternalLink && styles['menuExternalLink'],
          {
            [styles['active']]: isActive,
          },
        )}
        autoAddBaseUrl={autoAddBaseUrl}
        aria-current={isActive ? 'page' : undefined}
        to={href}
        {...(isInternalLink && {
          onClick: onItemClick ? () => onItemClick(item) : undefined,
        })}
        {...props}
      >
        {label}
        {!isInternalLink && <IconExternalLink />}
      </Link>
    </li>
  );
}
