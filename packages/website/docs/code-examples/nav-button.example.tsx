function NavButtonExample() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
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
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
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
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
        <NavButton>
          <Check /> Button
        </NavButton>
        <NavButton>
          Button <Plus />
        </NavButton>
        <NavButton>Button</NavButton>
      </div>
    </div>
  );
}
