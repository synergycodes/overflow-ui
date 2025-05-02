function ModalExample() {
  const [isOpen, setIsOpen] = useState(false);

  const UserCircleIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 256 256"
      fill="currentColor"
    >
      <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24ZM74.08,197.5a64,64,0,0,1,107.84,0,87.83,87.83,0,0,1-107.84,0ZM96,120a32,32,0,1,1,32,32A32,32,0,0,1,96,120Zm97.76,66.41a79.66,79.66,0,0,0-36.06-28.75,48,48,0,1,0-59.4,0,79.66,79.66,0,0,0-36.06,28.75,88,88,0,1,1,131.52,0Z" />
    </svg>
  );

  return (
    <>
      <LabelButton onClick={() => setIsOpen(true)} label={'Open Modal'} />
      <Modal
        open={isOpen}
        onClose={() => setIsOpen(false)}
        title="Example Modal"
        subtitle="This is an example subtitle"
        icon={<UserCircleIcon />}
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
