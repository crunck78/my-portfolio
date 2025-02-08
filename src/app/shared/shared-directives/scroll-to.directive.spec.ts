import { Component, ElementRef } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { ScrollToDirective } from './scroll-to.directive';

@Component({
  template: `<div class="scroll-to" appScrollTo ></div>`
})
class TestComponent { }

describe('ScrollToDirective', () => {

  let fixture;
  let element: ElementRef;
  let router: Router;

  beforeEach(() => {
    fixture = TestBed.configureTestingModule({
      declarations: [ScrollToDirective, TestComponent],
      imports: [
        RouterTestingModule.withRoutes([])
      ]
    }).createComponent(TestComponent);

    fixture.detectChanges();
    router = TestBed.inject(Router);

    element = fixture.debugElement.query(By.directive(ScrollToDirective)) as ElementRef;
  });

  it('should create an instance', () => {
    const directive = new ScrollToDirective(element, router);
    expect(directive).toBeTruthy();
  });
});
