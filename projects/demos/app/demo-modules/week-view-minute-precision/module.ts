import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DemoComponent } from './component';

@NgModule({
  imports: [
    DemoComponent,
    RouterModule.forChild([{ path: '', component: DemoComponent }]),
  ],
})
export class DemoModule {}
