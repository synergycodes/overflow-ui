import {
  Accordion,
  Avatar,
  Button,
  Checkbox,
  DatePicker,
  Input,
  NavButton,
  Radio,
  SegmentPicker,
  Select,
  Separator,
  Snackbar,
  Status,
  Switch,
  TextArea,
} from '../src/index';
import { Check, Plus, User, X } from '@phosphor-icons/react';
import styles from './preview-page.module.css';

export function PreviewPage() {
  return (
    <div className={styles['preview-container']}>
      <ButtonSection />
      <NavButtonSection />
      <SwitchSection />
      <InputSection />
      <TextAreaSection />
      <SelectSection />
      <CheckboxSection />
      <RadioSection />
      <SnackbarSection />
      <AccordionSection />
      <SegmentPickerSection />
      <AvatarSection />
      <StatusSection />
      <SeparatorSection />
      <DatePickerSection />
    </div>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className={styles['section']}>
      <header className={styles['section-header']}>{title}</header>
      {children}
    </section>
  );
}

function ButtonSection() {
  return (
    <Section title="Buttons">
      <div className={styles['col']}>
        <span className={styles['label']}>Label buttons (medium)</span>
        <div className={styles['row']}>
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="gray">Gray</Button>
          <Button variant="error">Error</Button>
          <Button variant="warning">Warning</Button>
          <Button variant="success">Success</Button>
          <Button variant="ghost-destructive">Ghost destructive</Button>
        </div>
        <span className={styles['label']}>Label buttons (small)</span>
        <div className={styles['row']}>
          <Button variant="primary" size="small">
            Primary
          </Button>
          <Button variant="secondary" size="small">
            Secondary
          </Button>
          <Button variant="gray" size="small">
            Gray
          </Button>
        </div>
        <span className={styles['label']}>Disabled / loading</span>
        <div className={styles['row']}>
          <Button variant="primary" disabled>
            Disabled
          </Button>
          <Button variant="primary" isLoading>
            Loading
          </Button>
        </div>
        <span className={styles['label']}>Icon buttons</span>
        <div className={styles['row']}>
          <Button variant="primary">
            <Check />
          </Button>
          <Button variant="secondary">
            <Plus />
          </Button>
          <Button variant="gray">
            <User />
          </Button>
        </div>
        <span className={styles['label']}>Icon-label buttons</span>
        <div className={styles['row']}>
          <Button variant="primary">
            <Plus />
            Add
          </Button>
          <Button variant="success">
            Confirm
            <Check />
          </Button>
          <Button variant="warning">
            <Check />
            Both
            <Check />
          </Button>
        </div>
      </div>
    </Section>
  );
}

function NavButtonSection() {
  return (
    <Section title="NavButton">
      <div className={styles['row']}>
        <NavButton>
          <Check />
        </NavButton>
        <NavButton shape="circle">
          <Plus />
        </NavButton>
        <NavButton transparent>
          <User />
        </NavButton>
        <NavButton disabled>
          <X />
        </NavButton>
      </div>
    </Section>
  );
}

function SwitchSection() {
  return (
    <Section title="Switch">
      <div className={styles['col']}>
        <div className={styles['row']}>
          <Switch size="medium" defaultChecked={false} />
          <Switch size="medium" defaultChecked />
          <Switch size="medium" disabled />
          <Switch size="medium" disabled defaultChecked />
        </div>
        <div className={styles['row']}>
          <Switch size="small" defaultChecked={false} />
          <Switch size="small" defaultChecked />
          <Switch size="small" disabled />
          <Switch size="small" disabled defaultChecked />
        </div>
      </div>
    </Section>
  );
}

function InputSection() {
  return (
    <Section title="Input">
      <div className={styles['col']}>
        <div className={styles['row']}>
          <Input size="medium" placeholder="Medium placeholder" />
          <Input size="medium" defaultValue="Medium with value" />
          <Input size="medium" disabled defaultValue="Disabled" />
          <Input size="medium" error defaultValue="Error" />
        </div>
        <div className={styles['row']}>
          <Input size="small" placeholder="Small placeholder" />
          <Input size="small" defaultValue="Small with value" />
        </div>
        <div className={styles['row']}>
          <Input
            size="medium"
            startAdornment={<User />}
            placeholder="Start adornment"
          />
          <Input
            size="medium"
            endAdornment={<Check />}
            defaultValue="End adornment"
          />
          <Input
            size="medium"
            startAdornment={<User />}
            endAdornment={<X />}
            defaultValue="Both"
          />
        </div>
      </div>
    </Section>
  );
}

function TextAreaSection() {
  return (
    <Section title="TextArea">
      <div className={styles['col']}>
        <div className={styles['row']}>
          <div style={{ width: '20rem' }}>
            <TextArea
              size="medium"
              placeholder="Medium placeholder"
              minRows={2}
              maxRows={5}
            />
          </div>
          <div style={{ width: '20rem' }}>
            <TextArea
              size="medium"
              defaultValue={'First line\nSecond line\nThird line'}
              minRows={1}
              maxRows={5}
            />
          </div>
          <div style={{ width: '20rem' }}>
            <TextArea
              size="medium"
              disabled
              defaultValue="Disabled"
              minRows={1}
              maxRows={3}
            />
          </div>
        </div>
        <div className={styles['row']}>
          <div style={{ width: '20rem' }}>
            <TextArea
              size="small"
              placeholder="Small placeholder"
              minRows={1}
              maxRows={5}
            />
          </div>
          <div style={{ width: '20rem' }}>
            <TextArea
              size="medium"
              error
              defaultValue="Error state"
              minRows={1}
              maxRows={3}
            />
          </div>
        </div>
      </div>
    </Section>
  );
}

function SelectSection() {
  return (
    <Section title="Select">
      <div className={styles['col']}>
        <div className={styles['row']}>
          <div style={{ width: '15rem' }}>
            <Select
              items={[
                { label: 'Chair', value: 'chair' },
                { label: 'Table', value: 'table' },
                { label: 'Sofa', value: 'sofa' },
                { type: 'separator' },
                { label: 'Other', value: 'other' },
              ]}
              placeholder="Pick"
            />
          </div>
          <div style={{ width: '15rem' }}>
            <Select
              items={[
                { label: 'A', value: 'a' },
                { label: 'B', value: 'b' },
              ]}
              defaultValue={'a'}
            />
          </div>
          <div style={{ width: '15rem' }}>
            <Select
              error
              items={[{ label: 'Item', value: 'i' }]}
              placeholder="Error"
            />
          </div>
        </div>
        <div className={styles['row']}>
          <div style={{ width: '15rem' }}>
            <Select
              size="small"
              items={[{ label: 'Small', value: 's' }]}
              placeholder="Small"
            />
          </div>
        </div>
      </div>
    </Section>
  );
}

function CheckboxSection() {
  return (
    <Section title="Checkbox">
      <div className={styles['row']}>
        <Checkbox size="extra-small" />
        <Checkbox size="small" />
        <Checkbox size="medium" />
        <Checkbox defaultChecked />
        <Checkbox indeterminate />
        <Checkbox disabled />
        <Checkbox disabled defaultChecked />
        <Checkbox disabled indeterminate />
      </div>
    </Section>
  );
}

function RadioSection() {
  return (
    <Section title="Radio">
      <div className={styles['row']}>
        <Radio name="r1" value="a" defaultChecked />
        <Radio name="r1" value="b" />
        <Radio name="r1" value="c" disabled />
        <Radio name="r1" value="d" disabled defaultChecked />
      </div>
    </Section>
  );
}

function SnackbarSection() {
  return (
    <Section title="Snackbar">
      <div className={styles['col']}>
        <Snackbar variant="success" title="Success" subtitle="Saved" />
        <Snackbar variant="error" title="Error" subtitle="Failed" close />
        <Snackbar
          variant="warning"
          title="Warning"
          subtitle="Pay attention"
          buttonLabel="Undo"
        />
        <Snackbar variant="info" title="Info" />
        <Snackbar variant="default" title="Default" close />
      </div>
    </Section>
  );
}

function AccordionSection() {
  return (
    <Section title="Accordion">
      <Accordion label="Default open" defaultOpen>
        <p>Open content.</p>
      </Accordion>
      <Accordion label="Default closed" defaultOpen={false}>
        <p>Hidden content.</p>
      </Accordion>
    </Section>
  );
}

function SegmentPickerSection() {
  return (
    <Section title="SegmentPicker">
      <SegmentPicker defaultValue="a">
        <SegmentPicker.Item value="a">
          <Check /> Alpha
        </SegmentPicker.Item>
        <SegmentPicker.Item value="b">
          <Plus /> Beta
        </SegmentPicker.Item>
      </SegmentPicker>
    </Section>
  );
}

function AvatarSection() {
  return (
    <Section title="Avatar">
      <div className={styles['row']}>
        <Avatar username="Alpha Bravo" size="small" />
        <Avatar username="Charlie Delta" size="medium" />
        <Avatar username="Echo Foxtrot" size="large" />
        <Avatar username="Golf Hotel" size="extra-large" />
      </div>
    </Section>
  );
}

function StatusSection() {
  return (
    <Section title="Status">
      <div className={styles['row']}>
        <Status status="invalid" />
      </div>
    </Section>
  );
}

function SeparatorSection() {
  return (
    <Section title="Separator">
      <div style={{ width: '12.5rem' }}>
        <Separator />
      </div>
    </Section>
  );
}

function DatePickerSection() {
  const today = new Date('2026-05-05T00:00:00');
  return (
    <Section title="DatePicker">
      <div className={styles['row']}>
        <div style={{ width: '15rem' }}>
          <DatePicker placeholder="dd/mm/yyyy" defaultValue={today} />
        </div>
        <div style={{ width: '15rem' }}>
          <DatePicker
            type="range"
            defaultValue={[today, new Date('2026-05-12T00:00:00')]}
          />
        </div>
        <div style={{ width: '15rem' }}>
          <DatePicker error placeholder="With error" />
        </div>
      </div>
    </Section>
  );
}
