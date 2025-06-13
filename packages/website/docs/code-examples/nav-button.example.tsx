function NavButtonExample() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
        <NavButton>
          <Check />
        </NavButton>
        <NavButton shape="circle">
          <Plus />
        </NavButton>
        <NavButton iconOnly={true}>
          <User />
        </NavButton>
      </div>
      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
        <NavButton isSelected>
          <Check />
        </NavButton>
        <NavButton shape="circle" isSelected>
          <Plus />
        </NavButton>
        <NavButton isSelected>
          Button <Plus />
        </NavButton>
        <NavButton isSelected>Button</NavButton>
      </div>
      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
        <NavButton>
          <Check /> Button
        </NavButton>
        <NavButton>
          Button <Plus />
        </NavButton>
        <NavButton>Button</NavButton>
      </div>
      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
        <NavButton size="xxx-small">
          <Check /> Button
        </NavButton>
        <NavButton size="xxx-small">
          Button <Plus />
        </NavButton>
        <NavButton size="xxx-small">Button</NavButton>
      </div>
    </div>
  );
}
