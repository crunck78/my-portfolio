import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { LandingComponent } from './routing-componets/landing/landing.component';
import { ImprintComponent } from './routing-componets/imprint/imprint.component';
import { LogoComponent } from './shared-components/logo/logo.component';
import { NavBarComponent } from './header/nav-bar/nav-bar.component';
import { IntroductionComponent } from './routing-componets/landing/introduction/introduction.component';
import { AboutMeComponent } from './routing-componets/landing/about-me/about-me.component';
import { SectionTitleComponent } from './shared-components/section-title/section-title.component';
import { MySkillsComponent } from './routing-componets/landing/my-skills/my-skills.component';
import { SkillComponent } from './shared-components/skill/skill.component';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LandingComponent,
    ImprintComponent,
    LogoComponent,
    NavBarComponent,
    IntroductionComponent,
    AboutMeComponent,
    SectionTitleComponent,
    MySkillsComponent,
    SkillComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
