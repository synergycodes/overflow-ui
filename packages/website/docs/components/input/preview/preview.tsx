import { InputWithStartAdornment } from './input-with-start-adornment';
import { InputWithEndAdornment } from './input-with-end-adornment';
import { SimpleInput } from './simple-input';
import classes from './preview.module.css';

export function Preview() {
  return (
    <div className={classes.container}>
      <SimpleInput />
      <InputWithStartAdornment />
      <InputWithEndAdornment />
    </div>
  );
}
