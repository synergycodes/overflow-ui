function IconButtonExample() {
  return (
    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
      <IconButton icon={<Check />} variant="primary" key={1} />
      <IconButton icon={<Plus />} variant="secondary" key={2} />
      <IconButton icon={<User />} variant="gray" key={3} />
    </div>
  );
}
