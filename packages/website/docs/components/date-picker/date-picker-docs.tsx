import { DatePicker } from '@synergycodes/axiom';
import { ComponentPage } from '@site/src/components/component-utils/component-page/component-page';
import exampleCode from '!!raw-loader!./date-picker.example.jsx';

export function DatePickerDocs() {
  return (
    <ComponentPage
      preview={
        <div
          style={{
            display: 'grid',
            width: '100%',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '1rem',
          }}
        >
          <DatePicker
            type="default"
            defaultValue={new Date()}
            valueFormat="DD.MM.YYYY HH:mm"
          />
          <DatePicker
            type="range"
            defaultValue={[
              new Date(),
              new Date(new Date().setDate(new Date().getDate() + 2)),
            ]} // now - day after tomorrow
          />
          <DatePicker
            type="multiple"
            defaultValue={[
              new Date(new Date().setDate(new Date().getDate() - 2)),
              new Date(),
              new Date(new Date().setDate(new Date().getDate() + 2)),
              new Date(new Date().setDate(new Date().getDate() + 4)),
            ]}
          />
        </div>
      }
      cssPaths={[
        'components/date-picker/date-picker.module.css',
        'components/date-picker/data-picker-mantine.css',
      ]}
      componentPath="components/date-picker/date-picker.tsx"
      exampleCode={exampleCode}
    />
  );
}
