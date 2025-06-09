import {
  Component,
  ChangeDetectionStrategy,
  ViewEncapsulation,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  CalendarEvent,
  CalendarMonthViewDay,
  CalendarView,
  CalendarModule,
  DateAdapter
} from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { Subject } from 'rxjs';
import { DemoUtilsModule } from '../demo-utils/module';

const RED_CELL: 'red-cell' = 'red-cell';
const BLUE_CELL: 'blue-cell' = 'blue-cell';

@Component({
  selector: 'mwl-demo-component',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  templateUrl: 'template.html',
  standalone: true,
  imports: [
    CommonModule,
    CalendarModule,
    DemoUtilsModule
  ],
  providers: [
    {
      provide: DateAdapter,
      useFactory: adapterFactory
    }
  ],
  styles: [
    `
      .red-cell {
        background-color: red !important;
      }
      .blue-cell {
        background-color: blue !important;
      }
    `,
  ],
})
export class DemoComponent {
  view: CalendarView = CalendarView.Month;

  viewDate = new Date();

  events: CalendarEvent[] = [];

  refresh = new Subject<void>();

  cssClass: string = RED_CELL;

  refreshView(): void {
    this.cssClass = this.cssClass === RED_CELL ? BLUE_CELL : RED_CELL;
    this.refresh.next();
  }

  beforeMonthViewRender({ body }: { body: CalendarMonthViewDay[] }): void {
    body.forEach((day) => {
      if (day.date.getDate() % 2 === 1) {
        day.cssClass = this.cssClass;
      }
    });
  }
}
