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
import { PortfolioComponent } from './routing-componets/landing/portfolio/portfolio.component';
import { ProjectComponent } from './routing-componets/landing/portfolio/project/project.component';
import { ContactComponent } from './routing-componets/landing/contact/contact.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ControlErrorPipe } from './control-error.pipe';
import { ControlIsValidPipe } from './control-is-valid.pipe';
import { FormFieldComponent } from './routing-componets/landing/contact/form-field/form-field.component';
import { DigitsCounterPipe } from './digits-counter.pipe';
import { RatioCounterPipe } from './ratio-counter.pipe';
import { SocialComponent } from './shared-components/social/social.component';
import { ScrollTopDirective } from './scroll-top.directive';
import { ScrollToDirective } from './scroll-to.directive';
import { DataProtectionComponent } from './routing-componets/data-protection/data-protection.component';
import { HttpClientModule } from '@angular/common/http';
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
    PortfolioComponent,
    ProjectComponent,
    ContactComponent,
    ControlErrorPipe,
    ControlIsValidPipe,
    FormFieldComponent,
    DigitsCounterPipe,
    RatioCounterPipe,
    SocialComponent,
    ScrollTopDirective,
    ScrollToDirective,
    DataProtectionComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
