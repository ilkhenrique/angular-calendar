import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { DemoComponent } from './component';

@NgModule({
  imports: [
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
    RouterModule.forChild([{ path: '', component: DemoComponent }]),
    DemoComponent
  ],
  exports: [DemoComponent],
})
export class DemoModule {}
