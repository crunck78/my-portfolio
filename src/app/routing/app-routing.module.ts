import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ImprintComponent } from './components/imprint/imprint.component';
import { LandingComponent } from './components/landing/landing.component';

const routes: Routes = [
  { path: '', component: LandingComponent, title: "Fullstack Developer | Mentor | Head of IT - Mihai-Andrei Neacsu" },
  { path: 'imprint', component: ImprintComponent, title: 'Imprint - Mihai-Andrei Neacsu' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'top' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
