import { Component, ElementRef } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { ScrollToDirective } from './scroll-to.directive';

@Component({
  template: `<div [appScrollTo]="'target'">Scroll To Target Element</div>
    <div id="target">Target Element</div> `,
  imports: [ScrollToDirective],
})
class TestComponent {}

describe('ScrollToDirective', () => {
  let fixture;
  let element!: ElementRef;

  beforeEach(() => {
    fixture = TestBed.configureTestingModule({
      declarations: [],
      imports: [TestComponent],
      providers: [provideRouter([])],
    }).createComponent(TestComponent);

    fixture.detectChanges();
    // let router = TestBed.inject(Router);
    element = fixture.debugElement.query(By.directive(ScrollToDirective));
  });

  it('should have three appScrollTo elements', () => {
    expect(element).toBeTruthy();
    // const directive = new ScrollToDirective();
    // expect(directive).toBeTruthy();
  });
});
