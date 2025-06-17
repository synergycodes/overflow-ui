import { Menu, Button } from '..';
import * as ReactDOM from 'react-dom/client';
import './index.css';

const root = ReactDOM.createRoot(
  document.querySelector('#root') as HTMLElement,
);

root.render(<Preview />);

function Preview() {
  return (
    <>
      <span className="ax-public-h1">Testing</span>
      <Menu items={[{ label: 'Item 1' }]}>
        <Button>Menu</Button>
      </Menu>
    </>
  );
}
