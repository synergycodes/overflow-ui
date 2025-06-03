import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import { ComponentPageProps } from '../component-page';
import styles from './component-tabs.module.css';
import { apiTab } from './api-tab';
import { playgroundTab } from './playground-tab';

const tabs: TabData[] = [playgroundTab, apiTab];

type Props = Omit<ComponentPageProps, 'className'>;
export function ComponentTabs({
  cssPaths,
  componentPath,
  hardcodedData,
  ...props
}: Props) {
  if (!componentPath) {
    return null;
  }

  const tabComponentProps: TabProps = {
    ...props,
    cssPaths: cssPaths ?? [],
    componentPath: componentPath ?? '',
    hardcodedData: hardcodedData ?? {},
  };

  return (
    <Tabs>
      {tabs.map(({ value, label, component: Component }) => (
        <TabItem key={value} value={value} label={label}>
          <div className={styles['component-tab']}>
            <Component {...tabComponentProps} />
          </div>
        </TabItem>
      ))}
    </Tabs>
  );
}

export type TabData = {
  value: string;
  label: string;
  component: TabComponent;
};

type TabComponent = (props: TabProps) => React.ReactNode;
export type TabProps = Required<Props>;
