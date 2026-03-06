import { Injectable, inject } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserDetailService } from '@core/services/user-detail.service';

@Injectable({ providedIn: 'root' })
export class UserDetailGuard implements CanActivate {
  private userDetailService = inject(UserDetailService);
  private router = inject(Router);

  canActivate(): boolean {
    if (this.userDetailService.getSelectedUser()()) {
      return true;
    } else {
      this.router.navigate(['/users']);
      return false;
    }
  }
}