import { Component, Input, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarEvent, EventAction } from 'calendar-utils';
import { ClickDirective } from '../click/click.directive';
import { KeydownEnterDirective } from '../keydown-enter/keydown-enter.directive';
import { CalendarA11yPipe } from '../calendar-a11y/calendar-a11y.pipe';

@Component({
  selector: 'mwl-calendar-event-actions',
  standalone: true,
  imports: [
    CommonModule,
    ClickDirective,
    KeydownEnterDirective,
    CalendarA11yPipe
  ],
  template: `
    <ng-template
      #defaultTemplate
      let-event="event"
      let-trackByActionId="trackByActionId"
    >
      <span *ngIf="event.actions" class="cal-event-actions">
        <a
          class="cal-event-action"
          href="javascript:;"
          *ngFor="let action of event.actions; trackBy: trackByActionId"
          (mwlClick)="action.onClick({ event: event, sourceEvent: $event })"
          (mwlKeydownEnter)="
            action.onClick({ event: event, sourceEvent: $event })
          "
          [ngClass]="action.cssClass"
          [innerHtml]="action.label"
          tabindex="0"
          role="button"
          [attr.aria-label]="
            { action: action } | calendarA11y : 'actionButtonLabel'
          "
        >
        </a>
      </span>
    </ng-template>
    <ng-template
      [ngTemplateOutlet]="customTemplate || defaultTemplate"
      [ngTemplateOutletContext]="{
        event: event,
        trackByActionId: trackByActionId
      }"
    >
    </ng-template>
  `,
})
export class CalendarEventActionsComponent {
  @Input() event: CalendarEvent;

  @Input() customTemplate: TemplateRef<any>;

  trackByActionId = (index: number, action: EventAction) =>
    action.id ? action.id : action;
}
