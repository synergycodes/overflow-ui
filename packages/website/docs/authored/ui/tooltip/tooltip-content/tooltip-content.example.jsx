function Page() {
  return (
    <Tooltip open={true}>
      <TooltipTrigger>
        <span>Tooltip</span>
      </TooltipTrigger>
      <TooltipContent>
        <span>Tooltip Content Component</span>
      </TooltipContent>
    </Tooltip>
  );
}
