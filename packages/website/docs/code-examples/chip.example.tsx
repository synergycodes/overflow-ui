function ChipExample() {
  return (
    <div style={{ display: 'grid', gap: '1rem' }}>
      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
        <span>Sizes:</span>
        <Chip label="small" size="s" />
        <Chip label="medium" size="m" />
        <Chip label="large" size="l" />
        <Chip label="extra-large" size="xl" />
      </div>
      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
        <span>Colors:</span>
        <Chip label="natural" color="natural" />
        <Chip label="accent-1" color="accent-1" />
        <Chip label="accent-2" color="accent-2" />
        <Chip label="accent-3" color="accent-3" />
        <Chip label="accent-4" color="accent-4" />
        <Chip label="accent-5" color="accent-5" />
      </div>
      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
        <span>With icon:</span>
        <Chip label="natural" color="natural" icon={<Link />} />
        <Chip label="accent-1" color="accent-1" icon={<Link />} />
        <Chip label="accent-2" color="accent-2" icon={<Link />} />
        <Chip label="accent-3" color="accent-3" icon={<Link />} />
        <Chip label="accent-4" color="accent-4" icon={<Link />} />
        <Chip label="accent-5" color="accent-5" icon={<Link />} />
      </div>
      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
        <span>Deletable:</span>
        <Chip
          label="natural"
          color="natural"
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
