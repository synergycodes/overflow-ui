function TooltipContentExample() {
  return (
    <Tooltip open={true}>
      <Tooltip.Trigger>
        <span>Tooltip</span>
      </Tooltip.Trigger>
      <Tooltip.Content>
        <span>Tooltip Content Component</span>
      </Tooltip.Content>
    </Tooltip>
  );
}
