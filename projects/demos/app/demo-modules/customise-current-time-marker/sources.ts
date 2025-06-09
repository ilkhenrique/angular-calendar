// Import the component and module files
import * as component from './component';
import * as moduleFile from './module';

// Create a function to convert the imported module to a string
function moduleToString(mod: any): string {
  return mod.toString();
}

// HTML content as a string
const templateHtml = `<ng-template
  #currentTimeMarkerTemplate
  let-columnDate="columnDate"
  let-dayStartHour="dayStartHour"
  let-dayStartMinute="dayStartMinute"
  let-dayEndHour="dayEndHour"
  let-dayEndMinute="dayEndMinute"
  let-isVisible="isVisible"
  let-topPx="topPx"
>
  <div
    class="cal-current-time-marker"
    *ngIf="isVisible && showMarker"
    [style.top.px]="topPx"
  ></div>
</ng-template>

<div class="form-group form-check">
  <input
    type="checkbox"
    class="form-check-input"
    id="showMarker"
    [(ngModel)]="showMarker"
  />
  <label class="form-check-label" for="showMarker">Show marker</label>
</div>

<mwl-calendar-week-view
  [viewDate]="viewDate"
  [currentTimeMarkerTemplate]="currentTimeMarkerTemplate"
  [dayStartHour]="dayStartHour"
  [dayEndHour]="dayEndHour"
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
