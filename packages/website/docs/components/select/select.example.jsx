function Page() {
  return (
    <Select
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
