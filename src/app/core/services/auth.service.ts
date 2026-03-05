import { Injectable, signal, computed } from '@angular/core';
import { delay, of } from 'rxjs';

interface UserCredential {
  username: string;
  password: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {

  private readonly mockUsers: UserCredential[] = [
    { username: "user123", password: "Password1!" },
    { username: "coder_gal", password: "SecurePass2#" },
    { username: "dev_master", password: "MySecretPwd3$" },
    { username: "test_account", password: "WeakPassword4%" },
    { username: "admin_user", password: "AdminPass5^" }
  ];

  private _isAuthenticated = signal(false);
  private _loading = signal(false);
  private _error = signal<string | null>(null);

  isAuthenticated = computed(() => this._isAuthenticated());
  loading = computed(() => this._loading());
  error = computed(() => this._error());

  login(credentials: UserCredential) {

    this._loading.set(true);
    this._error.set(null);

    return of(this.mockUsers).pipe(delay(500)).subscribe(users => {

      const validUser = users.find(
        u =>
          u.username === credentials.username &&
          u.password === credentials.password
      );

      if (validUser) {
        this._isAuthenticated.set(true);
      } else {
        this._error.set('Invalid username or password');
        this._isAuthenticated.set(false);
      }

      this._loading.set(false);
    });
  }

  logout() {
    this._isAuthenticated.set(false);
  }
}