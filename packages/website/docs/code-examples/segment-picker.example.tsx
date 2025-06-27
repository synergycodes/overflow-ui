function Example() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', width: '500px' }}>
      <SegmentPicker defaultValue="calendar">
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
