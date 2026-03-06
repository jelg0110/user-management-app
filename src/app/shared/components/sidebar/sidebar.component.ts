import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [MatListModule, MatIconModule, RouterLink, RouterLinkActive],
  template: `
    <mat-nav-list>
      <mat-list-item 
        routerLink="/dashboard" 
        routerLinkActive="active" 
        [routerLinkActiveOptions]="{ exact: true }"
      >
        <mat-icon matListItemIcon>dashboard</mat-icon>
        <h3 matListItemTitle>Dashboard</h3>
      </mat-list-item>
      <mat-list-item 
        routerLink="/users" 
        routerLinkActive="active"
        [routerLinkActiveOptions]="{ exact: true }"
      >
        <mat-icon matListItemIcon>group</mat-icon>
        <h3 matListItemTitle>People</h3>
      </mat-list-item>
    </mat-nav-list>
  `
})
export class SidebarComponent { }