import { NgModule } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { LandingModule } from './routing/components/landing/landing.module';
import { SharedModule } from './shared/shared.module';

const dependencies = [RouterOutlet, FooterComponent, HeaderComponent, LandingModule, SharedModule];

@NgModule({
  declarations: [],
  imports: [...dependencies],
  exports: [dependencies],
  providers: [],
})
export class AppModule {}
