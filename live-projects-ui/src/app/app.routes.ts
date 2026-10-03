import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ProjectDetailsComponent } from './pages/project-details/project-details.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    title: 'Wiltech Labs - Live Projects',
  },
  {
    path: 'project/:id',
    component: ProjectDetailsComponent,
    title: 'Wiltech Labs - Project Details',
  },
  {
    path: '**',
    redirectTo: '',
  },
];
