import clsx from 'clsx';
import styles from './avatar.module.css';

type Props = {
  /**
   * Provide to use it as alt of the image for better a11y
   */
  username: string;
  /**
   * Image URL
   */
  imageUrl?: string;
  /**
   * Size of the circle container
   */
  size?: Size;
  /**
   * Optional class name for the container element
   */
  classNameContainer?: string;
};

type Size = 'extra-large' | 'large' | 'medium' | 'small';

/**
 * Component for displaying user avatars with various sizes
 */
export function Avatar({
  imageUrl,
  username,
  size = 'extra-large',
  classNameContainer,
}: Props) {
  return (
    <div
      className={clsx(styles['container'], styles[size], classNameContainer)}
    >
      <img src={imageUrl} alt={username} />
    </div>
  );
}
