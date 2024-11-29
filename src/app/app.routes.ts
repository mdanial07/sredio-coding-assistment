import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { Navigation02Component } from './pages/navigation02/navigation02.component';
import { ArchivedProjectComponent } from './pages/archived-project/archived-project.component';

export const routes: Routes = [
  {
    path: '', component: LayoutComponent,
    children: [
      { path: '', component: DashboardComponent },
      { path: 'project-list', component: Navigation02Component },
      { path: 'archive-list', component: ArchivedProjectComponent },
    ]
  },
];
