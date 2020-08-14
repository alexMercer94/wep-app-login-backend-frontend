import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from 'src/components/dashboard/dashboard.component';
import { LoginComponent } from 'src/components/login/login.component';
import { SigninComponent } from 'src/components/signin/signin.component';
import { CanactivateDashboardGuard } from 'src/guards/canactivateDashboard/canactivate-dashboard.guard';
import { ClearSessionGuard } from 'src/guards/candeactivate-clearsession/candeactivate-clearsession.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'signin',
    component: SigninComponent,
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [CanactivateDashboardGuard],
    canDeactivate: [ClearSessionGuard],
  },
  {
    path: '**',
    redirectTo: 'login',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
