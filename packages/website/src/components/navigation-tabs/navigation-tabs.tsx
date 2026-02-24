import styles from './navigation-tabs.module.css';

interface TabItem {
  id: string;
  label: string;
  href: string;
}

interface NavigationTabsProps {
  tabs: TabItem[];
  activeTabId?: string;
}

function NavigationTabsComponent({ tabs, activeTabId }: NavigationTabsProps) {
  return (
    <nav className={styles['tabsContainer']}>
      {tabs.map((tab) => {
        const isActive = tab.id === activeTabId;
        if (isActive) {
          return (
            <div
              key={tab.id}
              className={`${styles['tabItem']} ${styles['active']}`}
              aria-current={'page'}
              aria-label={tab.label}
            >
              <span className={styles['radioIndicator']} aria-hidden="true" />
              <span>{tab.label}</span>
            </div>
          );
        }

        return (
          <a
            key={tab.id}
            href={tab.href}
            className={styles['tabItem']}
            aria-label={tab.label}
          >
            <span className={styles['radioIndicator']} aria-hidden="true" />
            <span>{tab.label}</span>
          </a>
        );
      })}
    </nav>
  );
}

export function NavigationTabs({
  isOverviewActive,
}: {
  isOverviewActive: boolean;
}) {
  const items = [
    {
      id: 'ui-components',
      label: 'Diagram and UI Components Quickstart',
      href: '/ui-components',
    },
    {
      id: 'interaction-components',
      label: 'Interaction Components Quickstart',
      href: '/premium',
    },
  ];

  return (
    <NavigationTabsComponent
      tabs={items}
      activeTabId={isOverviewActive ? 'ui-components' : undefined}
    />
  );
}
