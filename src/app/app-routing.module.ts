import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ImprintComponent } from './routing-componets/imprint/imprint.component';
import { LandingComponent } from './routing-componets/landing/landing.component';

const routes: Routes = [
  {path: '', component: LandingComponent},
  {path: '', component: ImprintComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
