import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-about-me',
  templateUrl: './about-me.component.html',
  styleUrls: ['./about-me.component.scss']
})
export class AboutMeComponent implements OnInit {
  @ViewChild('aboutImg') aboutImg!: ElementRef<HTMLElement>;

  constructor() { }

  ngOnInit(): void {
  }

}
