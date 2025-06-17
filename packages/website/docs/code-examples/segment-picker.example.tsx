function Example() {
  return (
    <div style={{ width: '500px' }}>
      <SegmentPicker value="1">
        <SegmentPicker.Item value="1">
          <Calendar /> Calendar
        </SegmentPicker.Item>
        <SegmentPicker.Item value="2">
          <AddressBook /> Contacts
        </SegmentPicker.Item>
      </SegmentPicker>
    </div>
  );
}
