import { Tooltip, TooltipContent, TooltipTrigger } from '@synergycodes/axiom';

export function Example() {
  return (
    <div
      style={{ display: 'flex', justifyContent: 'center', maxWidth: '200px' }}
    >
      <Tooltip>
        <TooltipTrigger>
          <span>Tooltip</span>
        </TooltipTrigger>
        <TooltipContent>
          <span>Tooltip</span>
        </TooltipContent>
      </Tooltip>
    </div>
  );
}
