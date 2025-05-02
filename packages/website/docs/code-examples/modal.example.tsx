function ModalExample() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <LabelButton onClick={() => setIsOpen(true)} label={'Open Modal'} />
      <Modal
        open={isOpen}
        onClose={() => setIsOpen(false)}
        title="Example Modal"
        subtitle="This is an example subtitle"
        icon={<User />}
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
  );
}
