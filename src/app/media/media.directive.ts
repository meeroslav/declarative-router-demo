import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[media]'
})
export class MediaDirective {
  private listenerCleanup: () => void;
  private hasView = false;

  constructor(private readonly viewContainer: ViewContainerRef,
              private readonly template: TemplateRef<any>) {}

  @Input() set media(value: string) {
    this.initListener(value);
  }

  private initListener(value: string): void {
    if (window) {
      if (this.listenerCleanup) {
        this.listenerCleanup();
      }

      const mediaQueryList = window.matchMedia(value);
      const listener = event => {
        if (event.matches && !this.hasView) {
          this.renderView();
        }
        if (!event.matches && this.hasView) {
          this.clearView();
        }
      };
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

  private renderView(): void {
    this.hasView = true;
    this.viewContainer.createEmbeddedView(this.template);
  }

  private clearView(): void {
    this.hasView = false;
    this.viewContainer.clear();
  }
}
