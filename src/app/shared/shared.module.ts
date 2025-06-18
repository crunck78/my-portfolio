import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FeedbackComponent } from './feedback/feedback.component';
import { LogoComponent } from './shared-components/logo/logo.component';
import { SectionTitleComponent } from './shared-components/section-title/section-title.component';
import { SocialComponent } from './shared-components/social/social.component';
import { ScrollToDirective } from './shared-directives/scroll-to.directive';
import { ScrollTopDirective } from './shared-directives/scroll-top.directive';

const dependencies = [
  CommonModule,
  RouterLink,
  FeedbackComponent,
  SocialComponent,
  SectionTitleComponent,
  LogoComponent,
  ScrollToDirective,
  ScrollTopDirective,
];

@NgModule({
  declarations: [],
  imports: [...dependencies],
  exports: [...dependencies],
})
export class SharedModule {}
