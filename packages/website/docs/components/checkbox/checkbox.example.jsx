function Page() {
  const [checked, setChecked] = useState([true, false]);

  const handleChange = (event) => {
    setChecked([event.target.checked, event.target.checked]);
  };

  return (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
      <Checkbox size="extra-small" />
      <Checkbox size="small" />
      <Checkbox size="medium" />
      <Checkbox
        checked={checked[0] && checked[1]}
        indeterminate={checked[0] !== checked[1]}
        onChange={handleChange}
      />
      <Checkbox disabled />
      <Checkbox disabled checked />
      <Checkbox disabled indeterminate />
    </div>
  );
}
