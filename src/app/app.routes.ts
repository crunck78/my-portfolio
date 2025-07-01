import { InMemoryScrollingOptions, Routes } from '@angular/router';
import { ImprintComponent } from './routing/components/imprint/imprint.component';
import { LandingComponent } from './routing/components/landing/landing.component';

export const routes: Routes = [
  {
    path: '',
    component: LandingComponent,
    title: 'Fullstack Developer | Mentor | Head of IT - Mihai-Andrei Neacsu',
  },
  {
    path: 'imprint',
    component: ImprintComponent,
    title: 'Imprint - Mihai-Andrei Neacsu',
  },
];

export const scrollingOptions: InMemoryScrollingOptions = {
  scrollPositionRestoration: 'top',
  anchorScrolling: 'enabled',
};
