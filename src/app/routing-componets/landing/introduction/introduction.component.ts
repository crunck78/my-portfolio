import { AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-introduction',
  templateUrl: './introduction.component.html',
  styleUrls: ['./introduction.component.scss']
})
export class IntroductionComponent implements OnInit, AfterViewInit {
  @ViewChild('curve') curve!: ElementRef;
  @ViewChild('me') me!: ElementRef;

  width: number = window.innerWidth;
  height: number = window.innerHeight;

  get viewBox() { return `0 0 ${this.width} ${this.height}` };

  getViewBox(w: number, height: number) {
    return `0 0 ${this.width} ${this.height}`;
  }

  get curvePathD() {
    return `M${(1442/1442)*this.width} ${(0/1079)*this.height}
  V${(712.4/1079)*this.height}
  C${(1417.8/1449)*this.width} ${(724.3/1079)*this.height}
   ${(1393/1449)*this.width} ${(735.9/1079)*this.height}
   ${(1367.7/1449)*this.width} ${(747.3/1079)*this.height}
  C${(1174.2/1449)*this.width} ${(834.1/1079)*this.height}
   ${(943.8/1449)*this.width} ${(908.2/1079)*this.height}
   ${(682.9/1449)*this.width} ${(967.3/1079)*this.height}
  C${(404.9/1449)*this.width} ${(1030.3/1079)*this.height}
   ${(152.1/1449)*this.width} ${(1063/1079)*this.height}
   ${(2/1449)*this.width} ${(1078.6/1079)*this.height}
  L${(0/1449)*this.width} ${(421.5/1079)*this.height}
  C${(236/1449)*this.width} ${(441.5/1079)*this.height}
   ${(353.4/1449)*this.width} ${(434.372/1079)*this.height}
   ${(569.5/1449)*this.width} ${(385/1079)*this.height}
  C${(984/1449)*this.width} ${(290.3/1079)*this.height}
   ${(1281.7/1449)*this.width} ${(152.1/1079)*this.height}
   ${(1442/1449)*this.width} ${(0/1079)*this.height}Z`;
  }

  get gradientTransform() {
    return `translate(${(674 / 1442) * this.width} ${(42.5 / 1079) * this.height}) rotate(82.2154) scale(${(887.756 / 1442) * this.width} ${(1492.19 / 1079) * this.height})`;
  }

  constructor() { }
  ngAfterViewInit(): void {
    console.log(this.curve);
    this.updateCurve();
  }

  ngOnInit(): void {
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.updateCurve();
  }

  updateCurve() {

    // let timeout = setTimeout(() => {
    //   clearTimeout(timeout);
    //   this.width = window.innerWidth;
    //   this.height = window.innerHeight < 1000 ? window.innerHeight : 1000;
    //   let imageHeight = this.me.nativeElement.getBoundingClientRect().height;
    //   let imageBottom = this.me.nativeElement.getBoundingClientRect().bottom;
    //   //const width = document.body.clientWidth;
    //   // this.curve.nativeElement.style.left = `-${this.curve.nativeElement.parentElement.getBoundingClientRect().x}px`;
    //   //this.width = width;
    //   //this.height = imageHeight * 2;
    //   this.curve.nativeElement.style.top = `${imageBottom - (712.4/1079)*this.height}px`;
    //   const hasHorizontalScrollbar = document.body.scrollWidth > document.body.clientWidth;
    //   if (hasHorizontalScrollbar || this.curve.nativeElement.style.top < 0) {
    //     this.updateCurve();
    //   }
    //   const horizontalScrollSameAsBodyWidth = document.body.scrollWidth == document.body.clientWidth;
    //   document.body.style.overflowX = horizontalScrollSameAsBodyWidth ? 'hidden' : 'visible';
    // }, 100)
  }

}
