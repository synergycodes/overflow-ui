function Page() {
  return (
    <TextArea
      size="medium"
      minRows={1}
      maxRows={5}
      placeholder="Placeholder text"
      defaultValue=""
      onChange={() => {}}
      disabled={false}
    />
  );
}
