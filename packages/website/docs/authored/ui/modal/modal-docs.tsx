import { Modal, LabelButton } from '@synergycodes/axiom';
import { ComponentPage } from '@site/src/components/component-utils/component-page/component-page';
import exampleCode from '!!raw-loader!@site/docs/code-examples/modal.example.tsx';
import { useState } from 'react';
import { UserCircle } from '@phosphor-icons/react';

export function ModalDocs() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <ComponentPage
      preview={
        <>
          <LabelButton
            onClick={() => setIsOpen(true)}
            label={'Open Modal'}
            style={{ width: 'max-content' }}
          />
          <Modal
            open={isOpen}
            onClose={() => setIsOpen(false)}
            title="Example Modal"
            subtitle="This is an example subtitle"
            icon={<UserCircle size={24} />}
            size="regular"
            footerVariant="integrated"
            footer={
              <>
                <LabelButton
                  onClick={() => setIsOpen(false)}
                  label="Cancel"
                  variant="secondary"
                />
                <LabelButton onClick={() => setIsOpen(false)} label="Confirm" />
              </>
            }
          >
            <p>
              This is an example of how to use the Modal component with all
              available props. The modal includes a title, subtitle, icon, and
              footer with action buttons.
            </p>
          </Modal>
        </>
      }
      cssPaths={['components/modal/modal.module.css']}
      componentPath="components/modal/modal.tsx"
      exampleCode={exampleCode}
    />
  );
}
