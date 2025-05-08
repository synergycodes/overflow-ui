import { Modal, LabelButton, Select } from '@synergycodes/axiom';
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
          <LabelButton
            onClick={() => setOpenedModal('default')}
            label={'Open Modal'}
            style={{ width: 'max-content' }}
          />
          <br />
          <LabelButton
            onClick={() => setOpenedModal('scroll')}
            label={'Open modal with scroll'}
            style={{ width: 'max-content' }}
            variant="secondary"
          />
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
                <LabelButton
                  onClick={() => setOpenedModal('')}
                  label="Cancel"
                  variant="secondary"
                />
                <LabelButton
                  onClick={() => setOpenedModal('')}
                  label="Confirm"
                />
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
                <LabelButton
                  onClick={() => setOpenedModal('')}
                  label="Cancel"
                  variant="secondary"
                />
                <LabelButton
                  onClick={() => setOpenedModal('')}
                  label="Confirm"
                />
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
