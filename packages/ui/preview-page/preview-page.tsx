import { useState } from 'react';
import {
  Accordion,
  Avatar,
  Button,
  Checkbox,
  DatePicker,
  Input,
  Menu,
  Modal,
  NavButton,
  Radio,
  SegmentPicker,
  Select,
  Separator,
  Snackbar,
  Status,
  Switch,
  TextArea,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '../src/index';
import { Check, Plus, User, X } from '@phosphor-icons/react';
import styles from './preview-page.module.css';

type Showcase =
  | 'main'
  | 'modal-regular'
  | 'modal-large'
  | 'menu-open'
  | 'select-open'
  | 'snackbar-success'
  | 'snackbar-error'
  | 'snackbar-warning'
  | 'snackbar-info'
  | 'snackbar-default'
  | 'tooltip-open'
  | 'date-picker-open';

function getShowcase(): Showcase {
  if (typeof window === 'undefined') return 'main';
  const param = new URLSearchParams(window.location.search).get('show');
  return (param as Showcase) ?? 'main';
}

export function PreviewPage() {
  const showcase = getShowcase();

  if (showcase === 'modal-regular') return <ModalShowcase size="regular" />;
  if (showcase === 'modal-large') return <ModalShowcase size="large" />;
  if (showcase === 'menu-open') return <MenuOpenShowcase />;
  if (showcase === 'select-open') return <SelectOpenShowcase />;
  if (showcase === 'tooltip-open') return <TooltipOpenShowcase />;
  if (showcase === 'date-picker-open') return <DatePickerOpenShowcase />;
  if (showcase.startsWith('snackbar-')) {
    const variant = showcase.replace('snackbar-', '') as
      | 'success'
      | 'error'
      | 'warning'
      | 'info'
      | 'default';
    return <SnackbarShowcase variant={variant} />;
  }
  return <MainShowcase />;
}

function MainShowcase() {
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
  testId,
  title,
  children,
}: {
  testId: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className={styles['section']} data-testid={`section-${testId}`}>
      <header className={styles['section-header']}>{title}</header>
      {children}
    </section>
  );
}

function ButtonSection() {
  return (
    <Section testId="button" title="Buttons — variants × sizes × states">
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
    <Section testId="nav-button" title="NavButton">
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
    <Section testId="switch" title="Switch — sizes × states">
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
    <Section testId="input" title="Input — sizes × adornments × states">
      <div className={styles['col']}>
        <div className={styles['row']}>
          <Input size="medium" placeholder="Medium placeholder" />
          <Input size="medium" defaultValue="Medium with value" />
          <Input size="medium" disabled defaultValue="Disabled" />
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
    <Section testId="textarea" title="TextArea — sizes × content × states">
      <div className={styles['col']}>
        <div className={styles['row']}>
          <div style={{ width: 320 }}>
            <TextArea
              size="medium"
              placeholder="Medium placeholder"
              minRows={2}
              maxRows={5}
            />
          </div>
          <div style={{ width: 320 }}>
            <TextArea
              size="medium"
              defaultValue={'First line\nSecond line\nThird line'}
              minRows={1}
              maxRows={5}
            />
          </div>
          <div style={{ width: 320 }}>
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
          <div style={{ width: 320 }}>
            <TextArea
              size="small"
              placeholder="Small placeholder"
              minRows={1}
              maxRows={5}
            />
          </div>
          <div style={{ width: 320 }}>
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
    <Section testId="select" title="Select (closed)">
      <div className={styles['col']}>
        <div className={styles['row']}>
          <div style={{ width: 240 }}>
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
          <div style={{ width: 240 }}>
            <Select
              items={[
                { label: 'A', value: 'a' },
                { label: 'B', value: 'b' },
              ]}
              defaultValue={'a'}
            />
          </div>
          <div style={{ width: 240 }}>
            <Select
              error
              items={[{ label: 'Item', value: 'i' }]}
              placeholder="Error"
            />
          </div>
        </div>
        <div className={styles['row']}>
          <div style={{ width: 240 }}>
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
    <Section testId="checkbox" title="Checkbox">
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
    <Section testId="radio" title="Radio">
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
    <Section testId="snackbar" title="Snackbar — variants (inline)">
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
    <Section testId="accordion" title="Accordion">
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
    <Section testId="segment-picker" title="SegmentPicker">
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
    <Section testId="avatar" title="Avatar">
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
    <Section testId="status" title="Status">
      <div className={styles['row']}>
        <Status status="invalid" />
      </div>
    </Section>
  );
}

function SeparatorSection() {
  return (
    <Section testId="separator" title="Separator">
      <div style={{ width: 200 }}>
        <Separator />
      </div>
    </Section>
  );
}

function DatePickerSection() {
  const today = new Date('2026-05-05T00:00:00');
  return (
    <Section testId="date-picker" title="DatePicker">
      <div className={styles['row']}>
        <div style={{ width: 240 }}>
          <DatePicker placeholder="dd/mm/yyyy" defaultValue={today} />
        </div>
        <div style={{ width: 240 }}>
          <DatePicker
            type="range"
            defaultValue={[today, new Date('2026-05-12T00:00:00')]}
          />
        </div>
        <div style={{ width: 240 }}>
          <DatePicker error placeholder="With error" />
        </div>
      </div>
    </Section>
  );
}

function ModalShowcase({ size }: { size: 'regular' | 'large' }) {
  return (
    <div className={styles['float-host']}>
      <Modal
        open
        title="Example modal"
        subtitle="A subtitle that describes the dialog"
        icon={<User />}
        size={size}
        footerVariant="integrated"
        footer={
          <>
            <Button variant="secondary">Cancel</Button>
            <Button>Confirm</Button>
          </>
        }
      >
        <p>Modal body content. Lorem ipsum dolor sit amet.</p>
      </Modal>
    </div>
  );
}

function MenuOpenShowcase() {
  const [open] = useState(true);
  return (
    <div className={styles['float-host']}>
      <Menu
        open={open}
        items={[
          { label: 'New file', onClick: () => {} },
          { label: 'Open', onClick: () => {} },
          { type: 'separator' },
          { label: 'Delete', destructive: true, onClick: () => {} },
        ]}
      >
        <Button>Menu trigger</Button>
      </Menu>
    </div>
  );
}

function SelectOpenShowcase() {
  return (
    <div className={styles['float-host']}>
      <div style={{ width: 240 }} data-testid="select-open-host">
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
    </div>
  );
}

function TooltipOpenShowcase() {
  return (
    <div className={styles['float-host']}>
      <Tooltip open>
        <TooltipTrigger>
          <span>Trigger</span>
        </TooltipTrigger>
        <TooltipContent>
          <span>Tooltip content</span>
        </TooltipContent>
      </Tooltip>
    </div>
  );
}

function DatePickerOpenShowcase() {
  const today = new Date('2026-05-05T00:00:00');
  return (
    <div className={styles['float-host']}>
      <div style={{ width: 240 }} data-testid="date-picker-open-host">
        <DatePicker defaultValue={today} />
      </div>
    </div>
  );
}

function SnackbarShowcase({
  variant,
}: {
  variant: 'success' | 'error' | 'warning' | 'info' | 'default';
}) {
  return (
    <div className={styles['float-host']}>
      <Snackbar
        variant={variant}
        title={`${variant} title`}
        subtitle="Snackbar subtitle"
        buttonLabel="Undo"
        close
      />
    </div>
  );
}
