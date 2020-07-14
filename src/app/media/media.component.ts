import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-media',
  template: '<ng-content *ngIf="isMatch"></ng-content>'
})
export class MediaComponent {
  @Input() set query(value: string) {
    this.initListener(value);
  }
  isMatch = false;
  private listenerCleanup: () => void;

  constructor() { }

  private initListener(value: string): void {
    if (window) {
      if (this.listenerCleanup) {
        this.listenerCleanup();
      }

      const mediaQueryList = window.matchMedia(value);
      const listener = event => this.isMatch = !!event.matches;
      this.listenerCleanup = () => mediaQueryList.removeEventListener('change', listener);
      // trigger initial
      listener({
        media: mediaQueryList.media,
        matches: mediaQueryList.matches
      });
      mediaQueryList.addEventListener('change', listener);
    }
  }
}
