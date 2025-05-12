export type CharacterCounterProps = {
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
