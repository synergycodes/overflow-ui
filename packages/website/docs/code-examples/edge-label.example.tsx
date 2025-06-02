function Example() {
  return (
    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
      <EdgeLabel>Edge Label</EdgeLabel>
      <EdgeLabel type="compound">
        <DiamondsFour />
        Edge Label
      </EdgeLabel>
      <EdgeLabel type="compound" state="selected">
        <DiamondsFour />
        Edge Label
      </EdgeLabel>
      <EdgeLabel type="compound" state="disabled">
        <DiamondsFour />
        Edge Label
      </EdgeLabel>
      <EdgeLabel type="icon">
        <DiamondsFour />
      </EdgeLabel>
    </div>
  );
}
