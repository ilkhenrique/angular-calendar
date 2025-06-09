import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  CalendarEvent,
  CalendarEventTitleFormatter,
  CalendarView,
  CalendarModule,
  DateAdapter
} from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { CustomEventTitleFormatter } from './custom-event-title-formatter.provider';
import { colors } from '../demo-utils/colors';
import { DemoUtilsModule } from '../demo-utils/module';

@Component({
  selector: 'mwl-demo-component',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: 'template.html',
  standalone: true,
  imports: [
    CommonModule,
    CalendarModule,
    DemoUtilsModule
  ],
  providers: [
    {
      provide: CalendarEventTitleFormatter,
      useClass: CustomEventTitleFormatter,
    },
    {
      provide: DateAdapter,
      useFactory: adapterFactory
    }
  ],
})
export class DemoComponent {
  view: CalendarView = CalendarView.Month;

  viewDate: Date = new Date();

  events: CalendarEvent[] = [
    {
      title: 'An event',
      start: new Date(),
      color: colors.red,
    },
  ];
}
