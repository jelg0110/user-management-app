import { inject, Injectable, signal } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { delay, of } from 'rxjs';

interface UserCredential {
  username: string;
  password: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private snackBar = inject(MatSnackBar);

  private readonly mockUsers: UserCredential[] = [
    { username: "user123", password: "Password1!" },
    { username: "coder_gal", password: "SecurePass2#" },
    { username: "dev_master", password: "MySecretPwd3$" },
    { username: "test_account", password: "WeakPassword4%" },
    { username: "admin_user", password: "AdminPass5^" }
  ];

  private _user = signal<UserCredential | null>(this.loadFromStorage());
  user = this._user.asReadonly();

  private _loading = signal(false);
  private _error = signal<string | null>(null);

  loading = this._loading.asReadonly();
  error = this._error.asReadonly();

  constructor() { }

  isAuthenticated(): boolean {
    return !!this._user();
  }

  login(credentials: UserCredential) {
    this._loading.set(true);
    this._error.set(null);

    return of(this.mockUsers)
      .pipe(delay(500))
      .subscribe(users => {
        const validUser = users.find(
          u =>
            u.username === credentials.username &&
            u.password === credentials.password
        );

        if (validUser) {
          this._user.set(validUser);
          this.saveToStorage(validUser);
        } else {
          const message = 'Invalid username or password';
          this._error.set(message);
          this.snackBar.open(message, 'Close', { duration: 3000 });
          this._user.set(null);
          this.clearStorage();
        }

        this._loading.set(false);
      });
  }

  logout() {
    this._user.set(null);
    this.clearStorage();
  }

  getToken(): string {
    return this._user() ? btoa(this._user()!.username) : '';
  }

  private readonly localStorageKey = 'user';

  private saveToStorage(user: UserCredential) {
    localStorage.setItem(this.localStorageKey, JSON.stringify(user));
  }

  private loadFromStorage(): UserCredential | null {
    const data = localStorage.getItem(this.localStorageKey);
    return data ? JSON.parse(data) : null;
  }

  private clearStorage() {
    localStorage.removeItem(this.localStorageKey);
  }
}