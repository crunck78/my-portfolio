import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-about-me',
  templateUrl: './about-me.component.html',
  styleUrls: ['./about-me.component.scss']
})
export class AboutMeComponent {

  @ViewChild('aboutImg') aboutImg!: ElementRef<HTMLElement>;

}
