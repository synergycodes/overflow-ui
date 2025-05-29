import { type ReactNode } from 'react';
import { useNavbarMobileSidebar } from '@docusaurus/theme-common/internal';
import SearchBar from '@theme/SearchBar';
import NavbarMobileSidebarToggle from '@theme/Navbar/MobileSidebar/Toggle';
import NavbarLogo from '@theme/Navbar/Logo';
import NavbarSearch from '@theme/Navbar/Search';

import styles from './navbar-content.module.css';
import { NavButton } from '@synergycodes/axiom';
import { GithubLogo } from '@phosphor-icons/react';
import { MagnifyingGlass } from '@phosphor-icons/react/dist/ssr';

function NavbarContentLayout({
  left,
  right,
}: {
  left: ReactNode;
  right: ReactNode;
}) {
  return (
    <div className={styles['navbar-content']}>
      <div>{left}</div>
      <div className={styles['search-section']}>{right}</div>
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
            // @ts-expect-error wrong typing
            rootElementName="a"
            href="https://github.com/synergycodes/axiom"
            className={styles['nav-button']}
            shape="circle"
            icon={<GithubLogo weight="fill" />}
          />
        </>
      }
    />
  );
}
