// Import the component and module files
import * as component from './component';
import * as moduleFile from './module';

// Create a function to convert the imported module to a string
function moduleToString(mod: any): string {
  return mod.toString();
}

// HTML content as a string
const templateHtml = `<div class="row">
  <div class="col-md-6">
    <div class="btn-group">
      <div
        class="btn btn-primary"
        mwlCalendarPreviousView
        [view]="'day'"
        [(viewDate)]="viewDate"
      >
        Previous
      </div>
      <div
        class="btn btn-outline-secondary"
        mwlCalendarToday
        [(viewDate)]="viewDate"
      >
        Today
      </div>
      <div
        class="btn btn-primary"
        mwlCalendarNextView
        [view]="'day'"
        [(viewDate)]="viewDate"
      >
        Next
      </div>
    </div>
  </div>
  <div class="col-md-6 text-right">
    <h3>{{ viewDate | calendarDate:('dayViewTitle') }}</h3>
  </div>
</div>
<br />

<mwl-day-view-scheduler
  [viewDate]="viewDate"
  [events]="events"
  [users]="users"
  (eventTimesChanged)="eventTimesChanged($event)"
  (userChanged)="userChanged($event)"
>
</mwl-day-view-scheduler>
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
