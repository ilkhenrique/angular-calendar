import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarEvent, CalendarView, CalendarModule } from 'angular-calendar';
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
  view: CalendarView = CalendarView.Day;

  viewDate: Date = new Date();

  events: CalendarEvent[] = [];
}
