import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ScrollTopDirective } from './shared-directives/scroll-top.directive';
import { ScrollToDirective } from './shared-directives/scroll-to.directive';

import { SocialComponent } from './shared-components/social/social.component';
import { SectionTitleComponent } from './shared-components/section-title/section-title.component';
import { LogoComponent } from './shared-components/logo/logo.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ScrollToDirective,
    ScrollTopDirective,

    SocialComponent,
    SectionTitleComponent,
    LogoComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ],
  exports: [
    ScrollToDirective,
    ScrollTopDirective,
    SocialComponent,
    SectionTitleComponent,
    LogoComponent,
    ReactiveFormsModule
  ]
})
export class SharedModule { }
