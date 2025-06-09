import {
  Directive,
  Output,
  EventEmitter,
  ElementRef,
  NgZone,
  OnInit,
  OnDestroy,
  Renderer2,
} from '@angular/core';

@Directive({
  selector: '[mwlKeydownEnter]',
  standalone: true,
})
export class KeydownEnterDirective implements OnInit, OnDestroy {
  @Output('mwlKeydownEnter') keydown = new EventEmitter<KeyboardEvent>(); // eslint-disable-line

  private keydownListener: () => void;

  constructor(
    private host: ElementRef<HTMLElement>,
    private ngZone: NgZone,
    private renderer: Renderer2
  ) {}

  ngOnInit(): void {
    // Using Renderer2 for DOM manipulation is the recommended approach in Ivy
    this.ngZone.runOutsideAngular(() => {
      this.keydownListener = this.renderer.listen(
        this.host.nativeElement,
        'keydown',
        (event: KeyboardEvent) => {
          if (event.key === 'Enter') {
            this.ngZone.run(() => {
              event.preventDefault();
              event.stopPropagation();
              this.keydown.emit(event);
            });
          }
        }
      );
    });
  }

  ngOnDestroy(): void {
    if (this.keydownListener) {
      this.keydownListener();
      this.keydownListener = null;
    }
  }
}
