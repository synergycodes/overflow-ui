import { CharacterCounterProps } from './types';
import characterCounterStyles from './character-counter.module.css';
import clsx from 'clsx';

export function CharacterCounter({
  className = '',
  value = 0,
  max = 250,
  isRequired = false,
}: CharacterCounterProps) {
  if (!max || max <= 0) return null;

  const isError = (isRequired && value === 0) || (isRequired && value > max);

  return (
    <div className={clsx(
      characterCounterStyles['container'],
      characterCounterStyles['text'],
      className,
      {
        [characterCounterStyles['error']]: isError,
      },
    )}>
      <p>{value}/{max}</p>
    </div>
  );
};