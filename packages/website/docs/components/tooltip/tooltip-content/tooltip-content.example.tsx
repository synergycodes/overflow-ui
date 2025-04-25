import { Tooltip, TooltipContent, TooltipTrigger } from '@synergycodes/axiom';

export function Example() {
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
