// Import the component and module files
import * as component from './component';
import * as moduleFile from './module';

// Create a function to convert the imported module to a string
function moduleToString(mod: any): string {
  return mod.toString();
}

// HTML content as a string
const templateHtml = `<mwl-demo-utils-calendar-header [(view)]="view" [(viewDate)]="viewDate">
</mwl-demo-utils-calendar-header>

<div [ngSwitch]="view">
  <mwl-calendar-month-view
    *ngSwitchCase="'month'"
    [viewDate]="viewDate"
    [events]="events"
    [activeDayIsOpen]="true"
    (eventClicked)="eventClicked($event)"
  >
  </mwl-calendar-month-view>
  <mwl-calendar-week-view
    *ngSwitchCase="'week'"
    [viewDate]="viewDate"
    [events]="events"
    (eventClicked)="eventClicked($event)"
  >
  </mwl-calendar-week-view>
  <mwl-calendar-day-view
    *ngSwitchCase="'day'"
    [viewDate]="viewDate"
    [events]="events"
    (eventClicked)="eventClicked($event)"
  >
  </mwl-calendar-day-view>
</div>
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
