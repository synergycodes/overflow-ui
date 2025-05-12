function CharacterCounterExample() {
  return (
    <div>
      <Input defaultValue="Hello World" size="medium" />
      <CharacterCounter max={256} />
    </div>
  );
}
