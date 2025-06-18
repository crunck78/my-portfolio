import { NgModule } from '@angular/core';

import { AboutMeComponent } from './about-me/about-me.component';
import { IntroductionComponent } from './introduction/introduction.component';

import { SharedModule } from 'src/app/shared/shared.module';
import { ContactComponent } from './contact/contact.component';
import { MySkillsComponent } from './my-skills/my-skills.component';
import { PortfolioComponent } from './portfolio/portfolio.component';

const dependencies = [
  MySkillsComponent,
  PortfolioComponent,
  ContactComponent,
  SharedModule,
  IntroductionComponent,
  AboutMeComponent,
];
@NgModule({
  declarations: [],
  imports: [...dependencies],
  exports: [...dependencies],
})
export class LandingModule {}
