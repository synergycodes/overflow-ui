import clsx from 'clsx';
import { forwardRef, useCallback, useMemo, useState } from 'react';
import { Popover } from '@base-ui/react/popover';
import { DayPicker, type DateRange, type Matcher } from 'react-day-picker';
import { format } from 'date-fns';
import { CaretLeft, CaretRight } from '@phosphor-icons/react';

import inputFontStyles from '@ui/shared/styles/input-font-size.module.css';
import inputSizeStyles from '@ui/shared/styles/input-size.module.css';

import styles from './date-picker.module.css';
import './data-picker-mantine.css';

import type { DatePickerProps, DatePickerType } from './types';

type Props = DatePickerProps & {
  /**
   * Format string used to render the selected date(s) in the trigger.
   *
   * **Note:** This implementation uses `date-fns` format tokens (e.g.
   * `dd/MM/yyyy`). The legacy default value `DD/MM/YYYY` (dayjs tokens) is
   * accepted and converted to the equivalent `date-fns` tokens for backwards
   * compatibility.
   *
   * @default 'DD/MM/YYYY'
   */
  valueFormat?: string;
  /**
   * Placeholder text shown when no date is selected.
   *
   * @default 'dd/mm/yyyy'
   */
  placeholder?: string;
  /**
   * Picker type.
   *
   * - `default` selects a single date
   * - `range` selects a `[from, to]` date range
   * - `multiple` selects an arbitrary array of dates
   *
   * @default 'default'
   */
  type?: DatePickerType;
  /**
   * Initial value when the picker is uncontrolled.
   *
   * - `default` accepts `Date | string`
   * - `range` accepts `[Date, Date]`
   * - `multiple` accepts `Date[]`
   */
  defaultValue?: Date | [Date, Date] | Date[] | string;
  /**
   * Controlled selected value. When set, the picker becomes controlled.
   */
  value?: Date | [Date, Date] | Date[] | string;
  /**
   * Render the trigger in an error state.
   *
   * @default false
   */
  error?: boolean;
};

/**
 * Component for selecting a date with customizable format and placeholder.
 *
 * Built on top of `react-day-picker` (calendar) composed with Base UI
 * `Popover` (positioning + dismiss + a11y). The input/trigger uses our
 * standard input-size and input-font-size design tokens.
 */
export const DatePicker = forwardRef<HTMLButtonElement, Props>(
  function DatePicker(
    {
      inputSize = 'medium',
      valueFormat = 'DD/MM/YYYY',
      placeholder = 'dd/mm/yyyy',
      type = 'default',
      value,
      defaultValue,
      error = false,
      disabled,
      readOnly,
      onChange,
      minDate,
      maxDate,
      id,
      className,
      'aria-label': ariaLabel,
      'aria-labelledby': ariaLabelledby,
    },
    ref,
  ) {
    const isControlled = value !== undefined;
    const [internalValue, setInternalValue] = useState<
      Date | [Date, Date] | Date[] | null
    >(() => normalizeInitialValue(defaultValue, type));
    const [open, setOpen] = useState(false);

    const currentValue = isControlled
      ? normalizeInitialValue(value, type)
      : internalValue;

    const formatToken = useMemo(
      () => dayjsTokenToDateFns(valueFormat),
      [valueFormat],
    );

    const triggerLabel = useMemo(
      () => formatTriggerLabel(currentValue, type, formatToken),
      [currentValue, type, formatToken],
    );

    const handleChange = useCallback(
      (next: Date | [Date, Date] | Date[] | null) => {
        if (!isControlled) {
          setInternalValue(next);
        }
        onChange?.(next);
      },
      [isControlled, onChange],
    );

    const disabledMatcher = useMemo<Matcher[] | undefined>(() => {
      const matchers: Matcher[] = [];
      if (minDate) matchers.push({ before: minDate });
      if (maxDate) matchers.push({ after: maxDate });
      return matchers.length === 0 ? undefined : matchers;
    }, [minDate, maxDate]);

    const triggerClassName = clsx(
      inputFontStyles[inputSize],
      inputSizeStyles[inputSize],
      styles['container'],
      {
        [styles['container--error']]: error,
        [styles['container--placeholder']]: triggerLabel === null,
      },
      className,
    );

    const calendar = (
      <>
        {type === 'default' && (
          <DayPicker
            mode="single"
            selected={currentValue instanceof Date ? currentValue : undefined}
            onSelect={(selected) => handleChange(selected ?? null)}
            disabled={disabledMatcher}
            startMonth={minDate}
            endMonth={maxDate}
            showOutsideDays
            navLayout="around"
            components={{ Chevron: CalendarChevron }}
          />
        )}
        {type === 'range' && (
          <DayPicker
            mode="range"
            selected={toDateRange(currentValue)}
            onSelect={(range) => handleChange(fromDateRange(range))}
            disabled={disabledMatcher}
            startMonth={minDate}
            endMonth={maxDate}
            showOutsideDays
            navLayout="around"
            components={{ Chevron: CalendarChevron }}
          />
        )}
        {type === 'multiple' && (
          <DayPicker
            mode="multiple"
            selected={
              Array.isArray(currentValue) && !isDateTuple(currentValue)
                ? (currentValue as Date[])
                : undefined
            }
            onSelect={(dates) => handleChange(dates ?? [])}
            disabled={disabledMatcher}
            startMonth={minDate}
            endMonth={maxDate}
            showOutsideDays
            navLayout="around"
            components={{ Chevron: CalendarChevron }}
          />
        )}
      </>
    );

    return (
      <Popover.Root
        open={disabled || readOnly ? false : open}
        onOpenChange={(nextOpen) => {
          if (disabled || readOnly) return;
          setOpen(nextOpen);
        }}
      >
        <Popover.Trigger
          ref={ref}
          id={id}
          type="button"
          disabled={disabled}
          aria-label={ariaLabel}
          aria-labelledby={ariaLabelledby}
          aria-readonly={readOnly || undefined}
          className={triggerClassName}
        >
          <span className={styles['trigger-label']}>
            {triggerLabel ?? placeholder}
          </span>
        </Popover.Trigger>
        <Popover.Portal>
          <Popover.Positioner sideOffset={4} align="start">
            <Popover.Popup className="mantine-Popover-dropdown">
              {calendar}
            </Popover.Popup>
          </Popover.Positioner>
        </Popover.Portal>
      </Popover.Root>
    );
  },
);

function CalendarChevron({
  orientation,
  className,
}: {
  orientation?: 'up' | 'down' | 'left' | 'right';
  className?: string;
}) {
  if (orientation === 'left') {
    return <CaretLeft className={className} weight="bold" />;
  }
  if (orientation === 'right') {
    return <CaretRight className={className} weight="bold" />;
  }
  // up/down used by dropdowns — fall back to a right-pointing caret rotated
  return <CaretRight className={className} weight="bold" />;
}

function dayjsTokenToDateFns(token: string): string {
  // Convert the most common day.js tokens to date-fns equivalents. We only
  // remap the tokens we actually use as defaults; consumers passing a custom
  // `valueFormat` are expected to use date-fns tokens (see TSDoc).
  return token.replace(/YYYY/g, 'yyyy').replace(/DD/g, 'dd');
  // MM (months) is identical between the two libraries.
}

function formatTriggerLabel(
  value: Date | [Date, Date] | Date[] | null,
  type: DatePickerType,
  token: string,
): string | null {
  if (value == null) return null;
  if (type === 'default') {
    return value instanceof Date ? format(value, token) : null;
  }
  if (type === 'range') {
    if (!isDateTuple(value)) return null;
    const [from, to] = value;
    return `${format(from, token)} – ${format(to, token)}`;
  }
  if (type === 'multiple') {
    if (!Array.isArray(value) || value.length === 0) return null;
    return value.map((d) => format(d, token)).join(', ');
  }
  return null;
}

function isDateTuple(value: unknown): value is [Date, Date] {
  return (
    Array.isArray(value) &&
    value.length === 2 &&
    value[0] instanceof Date &&
    value[1] instanceof Date
  );
}

function toDateRange(
  value: Date | [Date, Date] | Date[] | null,
): DateRange | undefined {
  if (!isDateTuple(value)) return undefined;
  return { from: value[0], to: value[1] };
}

function fromDateRange(range: DateRange | undefined): [Date, Date] | null {
  if (!range || !range.from || !range.to) return null;
  return [range.from, range.to];
}

function normalizeInitialValue(
  raw: Date | [Date, Date] | Date[] | string | null | undefined,
  type: DatePickerType,
): Date | [Date, Date] | Date[] | null {
  if (raw == null) return null;
  if (type === 'default') {
    if (raw instanceof Date) return raw;
    if (typeof raw === 'string') {
      const parsed = new Date(raw);
      return Number.isNaN(parsed.getTime()) ? null : parsed;
    }
    return null;
  }
  if (type === 'range') {
    return isDateTuple(raw) ? raw : null;
  }
  if (type === 'multiple') {
    return Array.isArray(raw) && raw.every((d) => d instanceof Date)
      ? (raw as Date[])
      : null;
  }
  return null;
}
