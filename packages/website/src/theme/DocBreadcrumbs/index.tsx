import { type ReactNode } from 'react';
import { useSidebarBreadcrumbs } from '@docusaurus/plugin-content-docs/client';
import Link from '@docusaurus/Link';

import styles from './styles.module.css';
import { CaretRight } from '@phosphor-icons/react';

function BreadcrumbsItemLink({
  children,
  href,
  isLast,
}: {
  children: ReactNode;
  href: string | undefined;
  isLast: boolean;
}): ReactNode {
  if (isLast) {
    return <span>{children}</span>;
  }

  return href ? (
    <Link href={href}>
      <span>{children}</span>
    </Link>
  ) : (
    <span>{children}</span>
  );
}

function BreadcrumbsItem({
  children,
  active,
}: {
  children: ReactNode;
  active?: boolean;
}): ReactNode {
  return (
    <>
      <div className={styles['breadcrumb-item']}>{children}</div>
      {!active && <CaretRight size="1rem" weight="bold" />}
    </>
  );
}

export default function DocBreadcrumbs(): ReactNode {
  const breadcrumbs = useSidebarBreadcrumbs();

  if (!breadcrumbs || breadcrumbs.length <= 1) {
    return null;
  }

  return (
    <nav className={styles['breadcrumb-container']}>
      {breadcrumbs.map((item, idx) => {
        const isLast = idx === breadcrumbs.length - 1;
        const href =
          item.type === 'category' && item.linkUnlisted ? undefined : item.href;

        return (
          <BreadcrumbsItem key={idx} active={isLast}>
            <BreadcrumbsItemLink href={href} isLast={isLast}>
              {item.label}
            </BreadcrumbsItemLink>
          </BreadcrumbsItem>
        );
      })}
    </nav>
  );
}
