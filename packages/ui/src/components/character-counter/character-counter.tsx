import characterCounterStyles from './character-counter.module.css';
import clsx from 'clsx';

export type Props = {
  /**
   * Optional custom class name to apply additional styles.
   */
  className?: string;

  /**
   * The current character count value to display (e.g., from an input or textarea).
   * Defaults to 0 if not provided.
   */
  value?: number;

  /**
   * The maximum allowed character count.
   * If 0 or undefined, the component will render nothing.
   */
  max?: number;

  /**
   * If true, adds red color to the text when value === 0 and value > max.
   * (Purely visual; doesn't enforce validation).
   */
  isRequired?: boolean;
};

export function CharacterCounter({
  className = '',
  value = 0,
  max = 250,
  isRequired = false,
}: Props) {
  if (!max || max <= 0) return null;

  const isError = (isRequired && value === 0) || (isRequired && value > max);

  return (
    <div
      className={clsx(characterCounterStyles['container'], className, {
        [characterCounterStyles['error']]: isError,
      })}
    >
      <p>
        {value}/{max}
      </p>
    </div>
  );
}
