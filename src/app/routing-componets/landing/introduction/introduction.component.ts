import { AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-introduction',
  templateUrl: './introduction.component.html',
  styleUrls: ['./introduction.component.scss']
})
export class IntroductionComponent implements OnInit, AfterViewInit {
  @ViewChild('curve') curve!: ElementRef;

  curvePathD = `M1442 0
  V712.4
  C1417.8 724.3
   1393 735.9
   1367.7 747.3
  C1174.2 834.1
   943.8 908.2
   682.9 967.3
  C404.9 1030.3
   152.1 1063
   2 1078.6
  L0 421.5
  C236 441.5
   353.4 434.372
   569.5 385
  C984 290.3
   1281.7 152.1
   1442 0Z`;

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
    let timeout = setTimeout(() => {
      clearTimeout(timeout);
      const width = document.body.clientWidth;
      this.curve.nativeElement.style.width = width;
      this.curve.nativeElement.style.height = width * 0.7482662968099861;
      this.curve.nativeElement.style.left = `-${this.curve.nativeElement.parentElement.getBoundingClientRect().x}px`;
    }, 300)
  }

}
