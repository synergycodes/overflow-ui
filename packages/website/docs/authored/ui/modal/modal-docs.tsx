import { Modal, Button, Select } from '@synergycodes/axiom';
import { ComponentPage } from '@site/src/components/component-utils/component-page/component-page';
import exampleCode from '!!raw-loader!@site/docs/code-examples/modal.example.tsx';
import { useState } from 'react';
import { UserCircle } from '@phosphor-icons/react';

export function ModalDocs() {
  const [openedModal, setOpenedModal] = useState('');

  return (
    <ComponentPage
      preview={
        <>
          <Button
            onClick={() => setOpenedModal('default')}
            style={{ width: 'max-content' }}
          >
            Open Modal
          </Button>
          <br />
          <Button
            onClick={() => setOpenedModal('scroll')}
            style={{ width: 'max-content' }}
            variant="secondary"
          >
            Open modal with scroll
          </Button>
          <Modal
            open={openedModal === 'default'}
            onClose={() => setOpenedModal('')}
            title="Example Modal"
            subtitle="This is an example subtitle"
            icon={<UserCircle size={24} />}
            size="regular"
            footerVariant="integrated"
            footer={
              <>
                <Button onClick={() => setOpenedModal('')} variant="secondary">
                  Cancel
                </Button>
                <Button onClick={() => setOpenedModal('')}>Confirm</Button>
              </>
            }
          >
            <p>
              This is an example of how to use the Modal component with all
              available props. The modal includes a title, subtitle, icon, and
              footer with action buttons.
            </p>
            <Select
              items={[1, 2, 3, 4, 5].map((item) => ({
                label: `${item}`,
                value: item,
              }))}
              placeholder="Example select inside"
            />
          </Modal>
          <Modal
            open={openedModal === 'scroll'}
            onClose={() => setOpenedModal('')}
            title="Example Modal with scroll"
            subtitle="This is an example subtitle"
            icon={<UserCircle size={24} />}
            size="regular"
            footerVariant="integrated"
            footer={
              <>
                <Button onClick={() => setOpenedModal('')} variant="secondary">
                  Cancel
                </Button>
                <Button onClick={() => setOpenedModal('')}>Confirm</Button>
              </>
            }
          >
            {Array(20)
              .fill(
                'This is an example of how to use the Modal component with all available props. The modal includes a title, subtitle, icon, and footer with action buttons.',
              )
              .map((text, index) => (
                <p key={index}>
                  <strong>{index + 1}.</strong> {text}
                </p>
              ))}
          </Modal>
        </>
      }
      cssPaths={['components/modal/modal.module.css']}
      componentPath="components/modal/modal.tsx"
      exampleCode={exampleCode}
    />
  );
}
