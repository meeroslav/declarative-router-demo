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
      this.listenerCleanup = () => this.removeListener(mediaQueryList, listener);
      // trigger initial
      listener({
        media: mediaQueryList.media,
        matches: mediaQueryList.matches
      });
      this.addListener(mediaQueryList, listener);
    }
  }

  private addListener(mql: MediaQueryList, listener: (event: MediaQueryListEvent) => void): void {
    mql.addEventListener
      ? mql.addEventListener( 'change', listener)
      : mql.addListener(listener);
  }

  private removeListener(mql: MediaQueryList, listener: (event: MediaQueryListEvent) => void): void {
    mql.removeEventListener
      ? mql.removeEventListener( 'change', listener)
      : mql.removeListener(listener);
  }
}
