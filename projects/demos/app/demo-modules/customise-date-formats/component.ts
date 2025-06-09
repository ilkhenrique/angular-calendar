import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  CalendarEvent,
  CalendarDateFormatter,
  CalendarView,
  CalendarModule,
} from 'angular-calendar';
import { CustomDateFormatter } from './custom-date-formatter.provider';
import { CalendarHeaderComponent } from '../demo-utils/calendar-header.component';

@Component({
  selector: 'mwl-demo-component',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: 'template.html',
  providers: [
    {
      provide: CalendarDateFormatter,
      useClass: CustomDateFormatter,
    },
  ],
  standalone: true,
  imports: [
    CommonModule,
    CalendarModule,
    CalendarHeaderComponent
  ]
})
export class DemoComponent {
  view: CalendarView = CalendarView.Month;

  viewDate: Date = new Date();

  events: CalendarEvent[] = [];
}
