function TextAreaExample() {
  return (
    <TextArea
      error={false}
      size="medium"
      minRows={1}
      maxRows={5}
      placeholder="Placeholder text"
      defaultValue=""
      disabled={false}
    />
  );
}
