function RadioExample() {
  const [selectedOption, setSelectedOption] = useState('option1');

  return (
    <div style={{ display: 'flex', gap: '8px' }}>
      <Radio
        name="example"
        value="option1"
        checked={selectedOption === 'option1'}
        onChange={(e) => setSelectedOption(e.target.value)}
      />
      <Radio
        name="example"
        value="option2"
        checked={selectedOption === 'option2'}
        onChange={(e) => setSelectedOption(e.target.value)}
      />
    </div>
  );
}
