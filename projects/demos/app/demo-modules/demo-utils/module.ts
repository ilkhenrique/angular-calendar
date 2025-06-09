import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CalendarModule } from 'angular-calendar';
import { CalendarHeaderComponent } from './calendar-header.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    CalendarModule,
    CalendarHeaderComponent
  ],
  exports: [
    CommonModule,
    FormsModule,
    CalendarModule,
    CalendarHeaderComponent
  ],
})
export class DemoUtilsModule {}
