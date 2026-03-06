import { Component, inject, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { UserDetailService } from '@core/services/user-detail.service';

@Component({
  selector: 'app-user',
  standalone: true,
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
  imports: [
    CommonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
  ],
})
export class UserComponent implements OnInit {
  private userDetailService = inject(UserDetailService);
  private router = inject(Router);

  user = signal<any | null>(null);

  ngOnInit() {
    const selected = this.userDetailService.getSelectedUser()();
    if (!selected) {
      this.router.navigate(['/users']);
    } else {
      this.user.set(selected);
    }
  }

  goBack() {
    this.router.navigate(['/users']);
  }
}