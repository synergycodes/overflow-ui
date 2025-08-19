import { type ReactNode } from 'react';
import { useNavbarMobileSidebar } from '@docusaurus/theme-common/internal';
import SearchBar from '@theme/SearchBar';
import NavbarMobileSidebarToggle from '@theme/Navbar/MobileSidebar/Toggle';
import NavbarLogo from '@theme/Navbar/Logo';
import NavbarSearch from '@theme/Navbar/Search';

import styles from './navbar-content.module.css';
import { NavButton } from '@synergycodes/overflow-ui';
import { GithubLogo } from '@phosphor-icons/react';
import { MagnifyingGlass } from '@phosphor-icons/react/dist/ssr';
import Link from '@docusaurus/Link';
import { clsx } from 'clsx';

const LINKS = [
  {
    label: 'UI Components',
    href: '',
    active: true,
  },
  {
    label: 'Premium',
    href: 'https://www.overflow.dev/premium?path=/',
    active: false,
  },
  {
    label: 'Contact',
    href: 'https://www.overflow.dev/contact',
    active: false,
  },
];

const openGithub = () => {
  window.location.href = 'https://github.com/synergycodes/overflow-ui';
};

function NavbarContentLayout({
  left,
  right,
}: {
  left: ReactNode;
  right: ReactNode;
}) {
  return (
    <div className={styles['navbar-content']}>
      <div className={styles['logo-section']}>{left}</div>
      <div className={styles['search-section']}>
        {right}
        <div className={styles['links-section']}>
          {LINKS.map(({ href, label, active }) => (
            <Link
              className={clsx({ [styles['active']]: active })}
              target="_self"
              key={label}
              href={href}
            >
              {label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function NavbarContent(): ReactNode {
  const mobileSidebar = useNavbarMobileSidebar();

  return (
    <NavbarContentLayout
      left={
        <>
          {!mobileSidebar.disabled && <NavbarMobileSidebarToggle />}
          <NavbarLogo />
        </>
      }
      right={
        <>
          <NavbarSearch className={styles['search-bar']}>
            <SearchBar />
            <MagnifyingGlass className={styles['search-icon']} />
          </NavbarSearch>
          <NavButton
            className={clsx('nav-button', styles['nav-button'])}
            onClick={openGithub}
            shape="circle"
          >
            <GithubLogo weight="fill" />
          </NavButton>
        </>
      }
    />
  );
}
