function NavIconButtonExample() {
  return (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
      <NavButton>
        <Check />
      </NavButton>
      <NavButton shape="circle">
        <Plus />
      </NavButton>
      <NavButton transparent={true}>
        <User />
      </NavButton>
    </div>
  );
}
