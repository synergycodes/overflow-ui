import type React from 'react';
import { useRef, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import wrapperStyles from '!!raw-loader!./shadow-dom-wrapper.css';
import demoStyles from '!!raw-loader!@site/static/css/shadow-dom-styles.css';
import acceptedDemoStylesList from '!!raw-loader!@site/static/css/accepted-paths.json';
import rejectedDemoStylesList from '!!raw-loader!@site/static/css/rejected-paths.json';

function appendMetaData(shadow: ShadowRoot, name: string, content: string) {
  if (!content) {
    return;
  }

  const meta = document.createElement('meta');
  meta.name = name;
  meta.textContent = content;
  shadow.appendChild(meta);
}

type ShadowDomWrapperProps = {
  children: React.ReactNode;
};

function ShadowDomWrapper({ children }: ShadowDomWrapperProps) {
  const hostRef = useRef<HTMLDivElement | null>(null);
  const [shadowRoot, setShadowRoot] = useState<ShadowRoot | null>(null);

  useEffect(() => {
    if (hostRef.current && !shadowRoot) {
      const shadow = hostRef.current.attachShadow({ mode: 'open' });

      // eslint-disable-next-line no-restricted-syntax
      if (demoStyles.includes('Mocked file run')) {
        console.error(
          '🌘 Shadow DOM plugin: The styles for the Shadow DOM plugin are missing.',
          'Run pnpm clear before starting a server to fix.',
          '',
          'For more information about preview debugging, check packages/website/tools/README.md',
        );
      }

      const style = document.createElement('style');
      style.textContent = `${wrapperStyles} ${demoStyles}`;
      shadow.appendChild(style);

      appendMetaData(shadow, 'accepted-files', acceptedDemoStylesList);
      appendMetaData(shadow, 'rejected-files', rejectedDemoStylesList);

      setShadowRoot(shadow);
    }
  }, [shadowRoot]);

  return (
    <div ref={hostRef}>
      {shadowRoot ? ReactDOM.createPortal(children, shadowRoot) : null}
    </div>
  );
}

export default ShadowDomWrapper;
