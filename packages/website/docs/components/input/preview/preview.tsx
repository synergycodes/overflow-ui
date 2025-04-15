import { RenderInputWithStartAdornment } from './render-input-with-start-adornment';
import { RenderInputWithEndAdornment } from './render-input-with-end-adornment';
import { RenderSimpleInput } from './render-simple-input';
import classes from './preview.module.css';

export function Preview() {
  return (
    <div className={classes.container}>
      <RenderSimpleInput />
      <RenderInputWithStartAdornment />
      <RenderInputWithEndAdornment />
    </div>
  );
}
