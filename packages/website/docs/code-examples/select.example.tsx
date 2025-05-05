function SelectExample() {
  return (
    <Select
      error={false}
      items={[
        { label: 'Chair', value: 'chair' },
        { label: 'Table', value: 'table' },
        { label: 'Sofa', value: 'sofa' },
        { label: 'Bookshelf', value: 'bookshelf' },
        { label: 'Wardrobe', value: 'wardrobe' },
        { type: 'separator' },
        { label: 'Other', value: 'other' },
      ]}
      placeholder="Pick"
    />
  );
}
