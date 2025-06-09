import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CalendarEvent, CalendarModule } from 'angular-calendar';
import { colors } from '../demo-utils/colors';
import { CommonModule } from '@angular/common';
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
  ]
})
export class DemoComponent {
  viewDate: Date = new Date();

  events: CalendarEvent[] = [
    {
      title: 'An all day event',
      color: colors.yellow,
      start: new Date(),
      allDay: true,
    },
    {
      title: 'A non all day event',
      color: colors.blue,
      start: new Date(),
    },
  ];
}
