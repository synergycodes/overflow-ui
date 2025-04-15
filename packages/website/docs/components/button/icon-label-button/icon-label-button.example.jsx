function Example() {
  const Check = () => (
    <svg width="20" height="20" viewBox="0 0 256 256">
      <path
        fill="currentColor"
        d="M232.49 80.49a12 12 0 0 1 0 17l-112 112a12 12 0 0 1-17 0l-56-56a12 12 0 1 1 17-17L112 184l103.51-103.51a12 12 0 0 1 16.98 0Z"
      />
    </svg>
  );

  const Plus = () => (
    <svg width="20" height="20" viewBox="0 0 256 256">
      <path
        fill="currentColor"
        d="M228 128a12 12 0 0 1-12 12h-76v76a12 12 0 0 1-24 0v-76H40a12 12 0 0 1 0-24h76V40a12 12 0 0 1 24 0v76h76a12 12 0 0 1 12 12Z"
      />
    </svg>
  );

  const User = () => (
    <svg width="20" height="20" viewBox="0 0 256 256">
      <path
        fill="currentColor"
        d="M128 24a104 104 0 1 0 104 104A104.11 104.11 0 0 0 128 24ZM74.08 197.5a64 64 0 0 1 107.84 0a87.83 87.83 0 0 1-107.84 0Zm125.17-7.9a80 80 0 0 0-142.5 0a88 88 0 1 1 142.5 0ZM128 120a32 32 0 1 0-32-32a32 32 0 0 0 32 32Zm0-48a16 16 0 1 1-16 16a16 16 0 0 1 16-16Z"
      />
    </svg>
  );
  return (
    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
      <IconLabelButton variant="primary">
        <Check />
        With Icon
      </IconLabelButton>
      <IconLabelButton variant="secondary">
        <Plus />
        Add Item
      </IconLabelButton>
      <IconLabelButton variant="gray">
        <User />
        Profile
      </IconLabelButton>
    </div>
  );
}
