import { Size } from '../shared/types/label-size';
import { ListItem } from '../shared/types/list-item';

export type MenuItemProps = ListItem & {
  destructive?: boolean;
  onClick?: () => void;
  size?: Size;
};
