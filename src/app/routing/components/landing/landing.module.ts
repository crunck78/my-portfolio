import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LandingComponent } from './landing.component';
import { IntroductionComponent } from './introduction/introduction.component';
import { AboutMeComponent } from './about-me/about-me.component';

import { PortfolioModule } from './portfolio/portfolio.module';
import { ContactModule } from './contact/contact.module';
import { MySkillsModule } from './my-skills/my-skills.module';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [LandingComponent, IntroductionComponent, AboutMeComponent],
  imports: [CommonModule, MySkillsModule, PortfolioModule, ContactModule, SharedModule],
  exports: [LandingComponent],
})
export class LandingModule {}
