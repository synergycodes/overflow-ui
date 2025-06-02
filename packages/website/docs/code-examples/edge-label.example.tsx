function Example() {
  return (
    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
      <EdgeLabel style={{ position: 'relative' }}>Edge Label</EdgeLabel>
      <EdgeLabel style={{ position: 'relative' }} type="compound">
        <DiamondsFour />
        Edge Label
      </EdgeLabel>
      <EdgeLabel
        style={{ position: 'relative' }}
        type="compound"
        state="selected"
      >
        <DiamondsFour />
        Edge Label
      </EdgeLabel>
      <EdgeLabel
        style={{ position: 'relative' }}
        type="compound"
        state="disabled"
      >
        <DiamondsFour />
        Edge Label
      </EdgeLabel>
      <EdgeLabel style={{ position: 'relative' }} type="icon">
        <DiamondsFour />
      </EdgeLabel>
    </div>
  );
}
