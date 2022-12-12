import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  isShow: boolean;
  topPosToStartShowing = 100;

  constructor() {
    this.isShow = true;
  }

  @HostListener('document:scroll', ['$event']) onScrollEvent($event) {
    const scrollPosition =
      window.pageYOffset ||
      document.documentElement.scrollTop ||
      document.body.scrollTop ||
      0;

    console.log('[scroll]', scrollPosition);

    if (scrollPosition >= this.topPosToStartShowing) {
      this.isShow = true;
    } else {
      this.isShow = false;
    }
  }

  gotoTop() {
    console.log('top')
    this.smoothScrollTop();
  }

  private smoothScrollTop(): void {
    const scrollToTop = window.setInterval(() => {
      const pos: number = window.pageYOffset;
      if (pos > 0) {
          window.scrollTo(0, pos - 20); // how far to scroll on each step
      } else {
          window.clearInterval(scrollToTop);
      }
    }, 16);
  }
}
