import { Component, EventEmitter, inject, Output } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { AuthService } from '@app/core/services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatToolbarModule, MatIconModule, MatButtonModule, MatMenuModule],
  template: `
    <mat-toolbar color="primary" class="row-between ">
      <div class="row-center">
        <button mat-icon-button (click)="menuToggle.emit()">
          <mat-icon>menu</mat-icon>
        </button>
        <button matButton [matMenuTriggerFor]="profileMenu" class="custom-button">
          <mat-icon matListAvatar>account_circle</mat-icon>
          Menu
          <mat-icon iconPositionEnd>keyboard_arrow_down</mat-icon>
        </button>
        <mat-menu #profileMenu="matMenu">
          <button mat-menu-item (click)="onLogout($event)">Logout</button>
        </mat-menu>
      </div>
      <button mat-icon-button>
        <mat-icon>notifications</mat-icon>
      </button>
    </mat-toolbar>
  `
})
export class HeaderComponent {
  private auth = inject(AuthService);
  @Output() menuToggle = new EventEmitter<void>();

  onLogout(event: MouseEvent) {
    this.auth.logout();
    event.stopPropagation();
  }
}