import { useNavbarMobileSidebar } from '@docusaurus/theme-common/internal';
import NavbarLogo from '@theme/Navbar/Logo';
import NavbarMobileSidebarToggle from '@theme/Navbar/MobileSidebar/Toggle';
import NavbarSearch from '@theme/Navbar/Search';
import SearchBar from '@theme/SearchBar';
import React from 'react';

import Link from '@docusaurus/Link';
import { DiscordLogo, GithubLogo } from '@phosphor-icons/react';
import { MagnifyingGlass } from '@phosphor-icons/react/dist/ssr';
import { NavButton } from '@synergycodes/overflow-ui';
import { clsx } from 'clsx';
import styles from './navbar-content.module.css';

const LINKS = [
  {
    label: 'UI Components',
    href: '',
    active: true,
  },
  {
    label: 'Interaction Components',
    href: 'https://www.overflow.dev/premium?path=/',
    active: false,
  },
  {
    label: 'Consulting',
    href: 'https://www.overflow.dev/react-flow-consulting',
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

const openDiscord = () => {
  window.location.href = 'https://discord.com/invite/FDMjRuarFb';
};

function NavbarContentLayout({
  left,
  right,
}: {
  left: React.ReactNode;
  right: React.ReactNode;
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

export default function NavbarContent(): React.ReactNode {
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
          <NavButton
            className={clsx('nav-button', styles['nav-button'])}
            onClick={openDiscord}
            shape="circle"
          >
            <DiscordLogo weight="fill" />
          </NavButton>
        </>
      }
    />
  );
}
