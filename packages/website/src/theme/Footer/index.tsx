import React, { type ReactNode } from 'react';

import { FooterLinkItem, useThemeConfig } from '@docusaurus/theme-common';
import Link from '@docusaurus/Link';

import styles from './footer.module.css';

const COPYRIGHT_ADDRESS = 'https://www.synergycodes.com/';
const COPYRIGHT_TEXT = `© Synergy Codes ${new Date().getFullYear()}`;

function Footer(): ReactNode {
  const { footer } = useThemeConfig();

  if (!footer) {
    return null;
  }

  const { links } = footer;

  return (
    <div className={styles['footer']}>
      <div className={styles['links-section']}>
        {links.map(({ to, label }: FooterLinkItem) => (
          <Link key={to} to={to}>
            {label}
          </Link>
        ))}
      </div>
      <Link to={COPYRIGHT_ADDRESS}>{COPYRIGHT_TEXT}</Link>
    </div>
  );
}

export default React.memo(Footer);
