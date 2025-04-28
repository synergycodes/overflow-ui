import { LabelButton, Snackbar } from "@synergycodes/axiom";
import { useState } from "react";

export function Example() {
  const [open, setOpen] = useState(false);

  return (
    <div>
      {!open && (
        <LabelButton onClick={() => setOpen(true)} label="Show Snackbar" />
      )}
      {open && (
        <Snackbar
          variant="success"
          title="Operation completed successfully"
          subtitle="Your changes have been saved"
          close={true}
          onClose={() => setOpen(false)}
          onButtonClick={() => alert('Button clicked')}
          buttonLabel="Undo"
        />
      )}
    </div>
  );
}
