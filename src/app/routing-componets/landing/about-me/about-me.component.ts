import { AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-about-me',
  templateUrl: './about-me.component.html',
  styleUrls: ['./about-me.component.scss']
})
export class AboutMeComponent implements OnInit, AfterViewInit {
  @ViewChild('aboutImg') aboutImg!: ElementRef<HTMLElement>;

  constructor() { }
  ngAfterViewInit(): void {
    this.updateLine();
  }

  ngOnInit(): void {
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.updateLine();
  }

  updateLine(){

    // const parent = this.aboutImg.nativeElement.parentElement as HTMLElement;
    // const paddingRightParent = window.getComputedStyle(parent, null).getPropertyValue('padding-right');
    // console.log(this.aboutImg.nativeElement.querySelector('::after'));
  }

}
