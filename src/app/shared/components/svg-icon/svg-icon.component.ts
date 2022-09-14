import { Component, Input, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIcon, MatIconRegistry } from '@angular/material/icon';
//
import { timer } from 'rxjs';

/**
 * @title SVG icons
 */
@Component({
  selector: 'app-svg-icon',
  templateUrl: 'svg-icon.component.html'
})
export class SvgIconComponent {
  @Input() svgIcon: any;
  @ViewChild('thirdIcon') thirdIcon: MatIcon;
  isRegistered = false;

  constructor(private iconRegistry: MatIconRegistry,
              private sanitizer: DomSanitizer) {}

  ngOnChanges() {
    if (!!this.svgIcon && !!this.svgIcon.name && !!this.svgIcon.data) {
      this.declareIcon(this.svgIcon.name, this.svgIcon.data);
    }
  }

  declareIcon(name, svg) {
    timer(100).subscribe(() => {
      this.iconRegistry.addSvgIconLiteral(
        name,
        this.sanitizer.bypassSecurityTrustHtml(svg)
      );
      this.isRegistered = true;
    });
  }
}
