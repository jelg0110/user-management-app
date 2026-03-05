import { Routes } from '@angular/router';
import { PublicLayoutComponent } from '@app/layouts/public-layout/public-layout.component';
import { PrivateLayoutComponent } from '@app/layouts/private-layout/private-layout.component';
import { AuthGuard } from '@app/core/guards/auth.guard';
import { LoginComponent } from '@features/auth/login/login.component';
import { UserListComponent } from '@app/features/users/user-list/user-list.component';

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
      { path: 'users', component: UserListComponent },
    ]
  },
  { path: '**', redirectTo: 'login' }
];