import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class UserDetailService {
  private selectedUser = signal<any | null>(null);

  selectUser(user: any) {
    this.selectedUser.set(user);
  }

  getSelectedUser() {
    return this.selectedUser.asReadonly();
  }

  clearSelectedUser() {
    this.selectedUser.set(null);
  }
}