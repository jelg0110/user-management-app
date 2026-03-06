import { Component, effect, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { getFormErrorMessage } from '@shared/utils/form-error.util';

@Component({
  standalone: true,
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatIconModule,
  ]
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private auth = inject(AuthService);
  private router = inject(Router);

  form = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  });

  loading = this.auth.loading;
  error = this.auth.error;
  hide = signal(true);

  private _navigateEffect = effect(() => {
    if (this.auth.isAuthenticated()) {
      this.router.navigate(['/users']);
    }
  });

  passwordClickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  getError(controlName: string) {
    return getFormErrorMessage(this.form.get(controlName));
  }

  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.auth.login(this.form.value as any);
  }
}