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
        [view]="'week'"
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
        [view]="'week'"
        [(viewDate)]="viewDate"
      >
        Next
      </div>
    </div>
  </div>
  <div class="col-md-6 text-right">
    <h3>{{ viewDate | calendarDate:('weekViewTitle') }}</h3>
  </div>
</div>
<br />

<ng-template
  #weekViewHourSegmentTemplate
  let-segment="segment"
  let-locale="locale"
  let-segmentHeight="segmentHeight"
  let-isTimeLabel="isTimeLabel"
>
  <div
    #segmentElement
    class="cal-hour-segment"
    [style.height.px]="segmentHeight"
    [class.cal-hour-start]="segment.isStart"
    [class.cal-after-hour-start]="!segment.isStart"
    [ngClass]="segment.cssClass"
    (mousedown)="startDragToCreate(segment, $event, segmentElement)"
  >
    <div class="cal-time" *ngIf="isTimeLabel">
      {{ segment.date | calendarDate:'weekViewHour':locale }}
    </div>
  </div>
</ng-template>

<mwl-calendar-week-view
  [viewDate]="viewDate"
  [events]="events"
  [hourSegmentTemplate]="weekViewHourSegmentTemplate"
  [weekStartsOn]="weekStartsOn"
>
</mwl-calendar-week-view>
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
