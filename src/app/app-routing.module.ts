import { NgModule } from '@angular/core';
import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { DataProtectionComponent } from './routing-componets/data-protection/data-protection.component';
import { ImprintComponent } from './routing-componets/imprint/imprint.component';
import { LandingComponent } from './routing-componets/landing/landing.component';

const routes: Routes = [
  {path: '', component: LandingComponent},
  {path: 'imprint', component: ImprintComponent},
  // {path: 'data-protection', component: DataProtectionComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
