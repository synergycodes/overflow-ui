function CheckboxExample() {
  const [{ shouldShownIndeterminate, checked }, setIndeterminateState] =
    useState({
      shouldShownIndeterminate: true,
      checked: false,
    });

  const handleChange = (event) => {
    setIndeterminateState({
      shouldShownIndeterminate: false,
      checked: event.target.checked,
    });
  };

  return (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
      <Checkbox size="extra-small" />
      <Checkbox size="small" />
      <Checkbox size="medium" />
      <Checkbox
        checked={!shouldShownIndeterminate && checked}
        indeterminate={shouldShownIndeterminate}
        onChange={handleChange}
      />
      <Checkbox disabled />
      <Checkbox disabled checked />
      <Checkbox disabled indeterminate />
    </div>
  );
}
