import { AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { toggleButtonAnimation, toggleIntroAnimation, toggleMeAnimation } from './introduction.animations';

@Component({
  selector: 'app-introduction',
  templateUrl: './introduction.component.html',
  styleUrls: ['./introduction.component.scss'],
  animations: [toggleMeAnimation, toggleIntroAnimation, toggleButtonAnimation]
})
export class IntroductionComponent implements OnInit, AfterViewInit {
  @ViewChild('curve') curve!: ElementRef;
  @ViewChild('me') me!: ElementRef;

  width: number = 1442;
  height: number = 1079;

  get viewBox() { return `0 0 ${this.width} ${this.height}` };

  get curvePathD() {
    return `M${(1442 / 1442) * this.width} ${(0 / 1079) * this.height}
  V${(712.4 / 1079) * this.height}
  C${(1417.8 / 1449) * this.width} ${(724.3 / 1079) * this.height}
   ${(1393 / 1449) * this.width} ${(735.9 / 1079) * this.height}
   ${(1367.7 / 1449) * this.width} ${(747.3 / 1079) * this.height}
  C${(1174.2 / 1449) * this.width} ${(834.1 / 1079) * this.height}
   ${(943.8 / 1449) * this.width} ${(908.2 / 1079) * this.height}
   ${(682.9 / 1449) * this.width} ${(967.3 / 1079) * this.height}
  C${(404.9 / 1449) * this.width} ${(1030.3 / 1079) * this.height}
   ${(152.1 / 1449) * this.width} ${(1063 / 1079) * this.height}
   ${(2 / 1449) * this.width} ${(1078.6 / 1079) * this.height}
  L${(0 / 1449) * this.width} ${(421.5 / 1079) * this.height}
  C${(236 / 1449) * this.width} ${(441.5 / 1079) * this.height}
   ${(353.4 / 1449) * this.width} ${(434.372 / 1079) * this.height}
   ${(569.5 / 1449) * this.width} ${(385 / 1079) * this.height}
  C${(984 / 1449) * this.width} ${(290.3 / 1079) * this.height}
   ${(1281.7 / 1449) * this.width} ${(152.1 / 1079) * this.height}
   ${(1442 / 1449) * this.width} ${(0 / 1079) * this.height}Z`;
  }

  get gradientTransform() {
    return `translate(${(674 / 1442) * this.width} ${(42.5 / 1079) * this.height}) rotate(82.2154) scale(${(887.756 / 1442) * this.width} ${(1492.19 / 1079) * this.height})`;
  }

  toggleMe = 'hidden';
  constructor() { }
  ngAfterViewInit(): void {
    setTimeout(() => this.toggleMe = 'visible', 200);
  }

  ngOnInit(): void {}

  /**
   * Primarily used to updateCurve
   * @param event
   */
  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.updateCurve();
  }

  /**
   * Out of use.
   */
  updateCurve() {
    let timeout = setTimeout(() => {
      clearTimeout(timeout);
      if (window.innerWidth > 1442)
        this.width = window.innerWidth;
      else
        this.width = 1442;
    }, 100)
  }

  /**
   * Testing
   */
  randomizePath() {
    const paths = Array.from(document.querySelectorAll('svg.shift-form path')) as SVGPathElement[];

    paths.forEach(path => {
      let d = path.getAttribute('d')?.split(' ').map(part => {
        // Convert part to a number before checking if it is NaN
        const numPart = parseFloat(part);
        if (!isNaN(numPart)) {
          return numPart + (Math.random() - 0.5) * 10; // Adjust range of randomness as needed
        }
        return part;
      }).join(' ');
      if (d) {
        path.setAttribute('d', d);
      }
    })
  }
}
