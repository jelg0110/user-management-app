import { Routes } from '@angular/router';
import { PublicLayoutComponent } from '@app/layouts/public-layout/public-layout.component';
import { PrivateLayoutComponent } from '@app/layouts/private-layout/private-layout.component';
import { AuthGuard } from '@core/guards/auth.guard';
import { LoginComponent } from '@features/auth/login/login.component';
import { DashboardComponent } from '@features/dashboard/dashboard.component';
import { UserListComponent } from '@features/users/user-list/user-list.component';
import { UserComponent } from '@features/users/user/user.component';

export const routes: Routes = [
  {
    path: '',
    component: PublicLayoutComponent,
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: 'login', component: LoginComponent }
    ]
  },
  {
    path: '',
    component: PrivateLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'users', component: UserListComponent },
      { path: 'users/:id', component: UserComponent },
    ]
  },
  { path: '**', redirectTo: 'login' }
];