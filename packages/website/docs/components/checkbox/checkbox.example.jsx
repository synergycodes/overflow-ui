function Page() {
  const [{ isSet, checked }, setIndeterminateState] = useState({
    isSet: true,
    checked: false,
  });

  const handleChange = (event) => {
    setIndeterminateState({ isSet: false, checked: event.target.checked });
  };

  return (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
      <Checkbox size="extra-small" />
      <Checkbox size="small" />
      <Checkbox size="medium" />
      <Checkbox
        checked={!isSet && checked}
        indeterminate={isSet}
        onChange={handleChange}
      />
      <Checkbox disabled />
      <Checkbox disabled checked />
      <Checkbox disabled indeterminate />
    </div>
  );
}
