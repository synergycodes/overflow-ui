function ModalExample() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open Modal</Button>
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
            <Button onClick={() => setIsOpen(false)} variant="secondary">
              Cancel
            </Button>
            <Button onClick={() => setIsOpen(false)}>Confirm</Button>
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
