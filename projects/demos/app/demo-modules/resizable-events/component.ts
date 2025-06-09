import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subject } from 'rxjs';
import { addDays } from 'date-fns';
import {
  CalendarEvent,
  CalendarEventTimesChangedEvent,
  CalendarView,
  CalendarModule,
  DateAdapter
} from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
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
      provide: DateAdapter,
      useFactory: adapterFactory
    }
  ],
})
export class DemoComponent {
  view: CalendarView = CalendarView.Week;

  viewDate = new Date();

  events: CalendarEvent[] = [
    {
      title: 'Resizable event',
      color: colors.yellow,
      start: new Date(),
      end: addDays(new Date(), 1), // an end date is always required for resizable events to work
      resizable: {
        beforeStart: true, // this allows you to configure the sides the event is resizable from
        afterEnd: true,
      },
    },
    {
      title: 'A non resizable event',
      color: colors.blue,
      start: new Date(),
      end: addDays(new Date(), 1),
    },
  ];

  refresh = new Subject<void>();

  eventTimesChanged({
    event,
    newStart,
    newEnd,
  }: CalendarEventTimesChangedEvent): void {
    event.start = newStart;
    event.end = newEnd;
    this.refresh.next();
  }
}
