function DatePickerExample() {
  const today = new Date();
  const inThreeDays = new Date(new Date().setDate(new Date().getDate() + 3));

  return <DatePicker type="range" defaultValue={[today, inThreeDays]} />;
}
