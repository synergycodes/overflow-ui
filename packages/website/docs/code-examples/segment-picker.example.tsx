function Example() {
  return (
    <div style={{ width: '500px' }}>
      <SegmentPicker value="calendar">
        <SegmentPicker.Item value="calendar">
          <Calendar /> Calendar
        </SegmentPicker.Item>
        <SegmentPicker.Item value="contacts">
          <AddressBook /> Contacts
        </SegmentPicker.Item>
      </SegmentPicker>
    </div>
  );
}
