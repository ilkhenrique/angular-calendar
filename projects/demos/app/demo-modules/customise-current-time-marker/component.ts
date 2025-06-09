import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { getHours } from 'date-fns';
import { CalendarModule } from 'angular-calendar';

@Component({
  selector: 'mwl-demo-component',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './template.html',
  styleUrls: ['./styles.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    CalendarModule
  ]
})
export class DemoComponent {
  viewDate = new Date();

  showMarker = true;

  // just for the purposes of the demo so it all fits in one screen
  dayStartHour = Math.max(0, getHours(new Date()) - 2);

  dayEndHour = Math.min(23, getHours(new Date()) + 2);
}
