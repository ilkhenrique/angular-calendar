// Import the component and module files
import * as component from './component';
import * as moduleFile from './module';

// Create a function to convert the imported module to a string
function moduleToString(mod: any): string {
  return mod.toString();
}

// HTML content as a string
const templateHtml = `<mwl-calendar-day-view
  [viewDate]="viewDate"
  [events]="events"
  [dayStartHour]="9"
  [dayEndHour]="17"
>
</mwl-calendar-day-view>
`;

// Use static content for the sources
export const sources = [
  {
    filename: 'component.ts',
    contents: {
      raw: { default: moduleToString(component) },
      highlighted: { default: moduleToString(component) },
    },
  },
  {
    filename: 'template.html',
    contents: {
      raw: { default: templateHtml },
      highlighted: { default: templateHtml },
    },
  },
  {
    filename: 'module.ts',
    contents: {
      raw: { default: moduleToString(moduleFile) },
      highlighted: { default: moduleToString(moduleFile) },
    },
  },
];
