function ChipExample() {
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
        <Chip
          label="neutral"
          color="neutral"
          onDelete={() => console.log('Deleted!')}
        />

        <Chip
          label="accent-1"
          color="accent-1"
          onDelete={() => console.log('Deleted!')}
        />
        <Chip
          label="accent-2"
          color="accent-2"
          onDelete={() => console.log('Deleted!')}
        />
        <Chip
          label="accent-3"
          color="accent-3"
          onDelete={() => console.log('Deleted!')}
        />
        <Chip
          label="accent-4"
          color="accent-4"
          onDelete={() => console.log('Deleted!')}
        />
        <Chip
          label="accent-5"
          color="accent-5"
          onDelete={() => console.log('Deleted!')}
        />
      </div>
    </div>
  );
}
