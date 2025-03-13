import clsx from 'clsx';
import styles from './avatar.module.css';

type Props = {
  username: string;
  imageUrl?: string;
  size?: Size;
};

type Size = 'extra-large' | 'large' | 'medium' | 'small';

export function Avatar({ imageUrl, username, size = 'extra-large' }: Props) {
  return (
    <div className={clsx(styles['container'], styles[size])}>
      <img src={imageUrl} alt={username} />
    </div>
  );
}
