import './navigation-tabs.css';

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
    <nav className="nav-tabs-container">
      {tabs.map((tab) => {
        const isActive = tab.id === activeTabId;
        if (isActive) {
          return (
            <div
              key={tab.id}
              className={`nav-tab-item active`}
              aria-current={'page'}
              aria-label={tab.label}
            >
              <span className="radio-indicator" aria-hidden="true" />
              <span>{tab.label}</span>
            </div>
          );
        }

        return (
          <a
            key={tab.id}
            href={tab.href}
            className={`nav-tab-item`}
            aria-label={tab.label}
          >
            <span className="radio-indicator" aria-hidden="true" />
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
      href: 'https://www.overflow.dev/ui-components',
    },
    {
      id: 'interaction-components',
      label: 'Interaction Components Quickstart',
      href: 'https://www.overflow.dev/premium',
    },
  ];

  return (
    <NavigationTabsComponent
      tabs={items}
      activeTabId={isOverviewActive ? 'ui-components' : undefined}
    />
  );
}
