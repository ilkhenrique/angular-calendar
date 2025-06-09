import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnDestroy,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { DOCUMENT, CommonModule } from '@angular/common';
import { CalendarEvent, CalendarView, CalendarModule } from 'angular-calendar';
import { CalendarHeaderComponent } from '../demo-utils/calendar-header.component';
import { colors } from '../demo-utils/colors';

@Component({
  selector: 'mwl-demo-component',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: 'template.html',
  styleUrls: ['styles.scss'],
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [
    CommonModule,
    CalendarModule,
    CalendarHeaderComponent
  ]
})
export class DemoComponent implements OnInit, OnDestroy {
  view: CalendarView = CalendarView.Month;

  viewDate = new Date();

  events: CalendarEvent[] = [
    {
      title: 'An event',
      start: new Date(),
      color: colors.red,
    },
  ];

  private readonly darkThemeClass = 'dark-theme';

  constructor(@Inject(DOCUMENT) private document) {}

  ngOnInit(): void {
    this.document.body.classList.add(this.darkThemeClass);
  }

  ngOnDestroy(): void {
    this.document.body.classList.remove(this.darkThemeClass);
  }
}
