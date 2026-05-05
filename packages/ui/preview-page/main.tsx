import { createRoot } from 'react-dom/client';
import { PreviewPage } from './preview-page';

const root = createRoot(document.querySelector('#root') as HTMLElement);
root.render(<PreviewPage />);
