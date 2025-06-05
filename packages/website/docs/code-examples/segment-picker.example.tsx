function SegmentPickerExample() {
  const [sizeActive, setSizeActive] = useState('one');

  const [roundedActive, setRoundedActive] = useState(1);
  const rounded = [1, 2, 3, 4, 5];

  const [squareActive, setSquareActive] = useState(1);
  const square = { One: 1, Two: 2, Three: 3, Four: 4, Five: 5 };

  const sizes = [
    'xxx-small',
    'xx-small',
    'extra-small',
    'small',
    'medium',
    'large',
    'extra-large',
  ];
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '10px',
      }}
    >
      <div style={{ display: 'grid', gap: '5px', minWidth: '200px' }}>
        {sizes.map((size) => (
          <SegmentPicker
            key={size}
            onChange={(
              event: React.MouseEvent<HTMLButtonElement>,
              value: string,
            ) => setSizeActive(value)}
            value={sizeActive}
            size={size}
          >
            <SegmentPickerOption value="one" key="one" label="One" />
            <SegmentPickerOption value="two" key="Two" label="Two" />
          </SegmentPicker>
        ))}
      </div>
      <div>
        <SegmentPicker
          key={'rounded'}
          variant="rounded"
          onChange={(
            event: React.MouseEvent<HTMLButtonElement>,
            value: number,
          ) => setRoundedActive(value)}
          value={roundedActive}
        >
          {rounded.map((i) => (
            <SegmentPickerOption
              value={i}
              key={`rounded-${i}`}
              icon={<Plus />}
            />
          ))}
        </SegmentPicker>
      </div>
      <div style={{ width: '500px' }}>
        <SegmentPicker
          key={'square'}
          onChange={(
            event: React.MouseEvent<HTMLButtonElement>,
            value: number,
          ) => setSquareActive(value)}
          value={squareActive}
        >
          {Object.entries(square).map(([key, i]) => (
            <SegmentPickerOption
              value={i}
              key={key}
              beforeIcon={<Plus />}
              label={key}
            />
          ))}
        </SegmentPicker>
      </div>
    </div>
  );
}
