import type React from 'react';
import { useRef, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import wrapperStyles from '!!raw-loader!./shadow-dom-wrapper.css';
import demoStyles from '!!raw-loader!@site/static/css/shadow-dom-styles.css';

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
        );
      }

      const style = document.createElement('style');
      style.textContent = `${wrapperStyles} ${demoStyles}`;
      shadow.appendChild(style);

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
