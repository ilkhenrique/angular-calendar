import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarEvent, CalendarView, DAYS_OF_WEEK, CalendarModule } from 'angular-calendar';
import moment from 'moment';
import { CalendarHeaderComponent } from '../demo-utils/calendar-header.component';

// weekStartsOn option is ignored when using moment, as it needs to be configured globally for the moment locale
moment.updateLocale('en', {
  week: {
    dow: DAYS_OF_WEEK.MONDAY,
    doy: 0,
  },
});

@Component({
  selector: 'mwl-demo-component',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: 'template.html',
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
