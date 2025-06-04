import { Link } from '@phosphor-icons/react';
import { Chip, ChipProps } from '@synergycodes/axiom';
import { useState } from 'react';

export function ChipPreview() {
  const [chips, setChips] = useState([
    'neutral',
    'accent-1',
    'accent-2',
    'accent-3',
    'accent-4',
    'accent-5',
  ]);
  return (
    <div style={{ display: 'grid', gap: '1rem' }}>
      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
        <span>Sizes:</span>
        <Chip label="small" size="small" />
        <Chip label="medium" size="medium" />
        <Chip label="large" size="large" />
        <Chip label="extra-large" size="extra-large" />
      </div>
      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
        <span>Colors:</span>
        <Chip label="neutral" color="neutral" />
        <Chip label="accent-1" color="accent-1" />
        <Chip label="accent-2" color="accent-2" />
        <Chip label="accent-3" color="accent-3" />
        <Chip label="accent-4" color="accent-4" />
        <Chip label="accent-5" color="accent-5" />
      </div>
      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
        <span>With icon:</span>
        <Chip label="neutral" color="neutral" icon={<Link />} />
        <Chip label="accent-1" color="accent-1" icon={<Link />} />
        <Chip label="accent-2" color="accent-2" icon={<Link />} />
        <Chip label="accent-3" color="accent-3" icon={<Link />} />
        <Chip label="accent-4" color="accent-4" icon={<Link />} />
        <Chip label="accent-5" color="accent-5" icon={<Link />} />
      </div>
      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
        <span>Deletable:</span>
        {chips.map((chip) => (
          <Chip
            label={chip}
            color={chip as ChipProps['color']}
            onDelete={() => setChips((prev) => prev.filter((c) => c !== chip))}
          />
        ))}
      </div>
    </div>
  );
}
