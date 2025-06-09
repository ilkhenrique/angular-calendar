// Import the component and module files
import * as component from './component';
import * as moduleFile from './module';

// Create a function to convert the imported module to a string
function moduleToString(mod: any): string {
  return mod.toString();
}

// HTML content as a string
const templateHtml = `<div class="row">
  <div class="col-md-3">
    <div
      class="card"
      mwlDroppable
      (drop)="externalDrop($event.dropData.event)"
      dragOverClass="drag-over"
    >
      <div class="card-body">
        <p *ngIf="externalEvents.length === 0"><em>No events added</em></p>
        <ul>
          <li
            *ngFor="let event of externalEvents"
            mwlDraggable
            [dropData]="{event: event}"
            [touchStartLongPress]="{ delay: 300, delta: 30 }"
            dragActiveClass="drag-active"
          >
            <a href="javascript:;" [style.color]="event.color.primary">
              {{ event.title }}
            </a>
          </li>
        </ul>
      </div>
    </div>
  </div>

  <div class="col-md-9">
    <mwl-demo-utils-calendar-header [(view)]="view" [(viewDate)]="viewDate">
    </mwl-demo-utils-calendar-header>

    <div [ngSwitch]="view">
      <mwl-calendar-month-view
        *ngSwitchCase="CalendarView.Month"
        [viewDate]="viewDate"
        [events]="events"
        [activeDayIsOpen]="activeDayIsOpen"
        [refresh]="refresh"
        (eventTimesChanged)="eventDropped($event)"
      >
      </mwl-calendar-month-view>
      <mwl-calendar-week-view
        *ngSwitchCase="CalendarView.Week"
        [viewDate]="viewDate"
        [events]="events"
        [refresh]="refresh"
        [snapDraggedEvents]="false"
        (eventTimesChanged)="eventDropped($event)"
      >
      </mwl-calendar-week-view>
      <mwl-calendar-day-view
        *ngSwitchCase="CalendarView.Day"
        [viewDate]="viewDate"
        [events]="events"
        [refresh]="refresh"
        [snapDraggedEvents]="false"
        (eventTimesChanged)="eventDropped($event)"
      >
      </mwl-calendar-day-view>
    </div>
  </div>
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
