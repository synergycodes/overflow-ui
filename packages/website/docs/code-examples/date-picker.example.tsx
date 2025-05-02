function DatePickerExample() {
  return (
    <div
      style={{
        display: 'grid',
        width: '100%',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '1rem',
      }}
    >
      <DatePicker
        type="default"
        defaultValue={new Date()}
        valueFormat="DD.MM.YYYY HH:mm"
      />
      <DatePicker
        type="range"
        defaultValue={[
          new Date(),
          new Date(new Date().setDate(new Date().getDate() + 2)),
        ]} // now - day after tomorrow
      />
      <DatePicker
        error={false}
        type="multiple"
        defaultValue={[
          new Date(new Date().setDate(new Date().getDate() - 2)),
          new Date(),
          new Date(new Date().setDate(new Date().getDate() + 2)),
          new Date(new Date().setDate(new Date().getDate() + 4)),
        ]}
      />
    </div>
  );
}
