function AccordionExample() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '0.5rem',
        width: '100%',
      }}
    >
      <Accordion label="Default Open Accordion" defaultOpen>
        <p>
          This accordion is open by default. Click the header to collapse it.
        </p>
      </Accordion>
      <Accordion label="Initially Closed Accordion" defaultOpen={false}>
        <p>This accordion starts closed. Click the header to expand it.</p>
      </Accordion>
      <Accordion label="Accordion with Rich Content" defaultOpen={false}>
        <div
          style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}
        >
          <p>Accordions can contain any content, including nested elements.</p>
          <ul>
            <li>Item one</li>
            <li>Item two</li>
            <li>Item three</li>
          </ul>
        </div>
      </Accordion>
    </div>
  );
}
