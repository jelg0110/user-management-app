import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';

interface SidebarItem {
  label: string;
  icon: string;
  route: string;
  exact?: boolean;
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [MatListModule, MatIconModule, RouterLink, RouterLinkActive],
  template: `
    <mat-nav-list>
      @for (item of menuItems; track item.route) {
        <mat-list-item
          [routerLink]="item.route"
          routerLinkActive="active"
          [routerLinkActiveOptions]="{ exact: item.exact ?? false }"
        >
          <mat-icon matListItemIcon>{{ item.icon }}</mat-icon>
          <h3 matListItemTitle>{{ item.label }}</h3>
        </mat-list-item>
      }
    </mat-nav-list>
  `
})
export class SidebarComponent {

  menuItems: SidebarItem[] = [
    {
      label: 'Dashboard',
      icon: 'dashboard',
      route: '/dashboard',
      exact: true
    },
    {
      label: 'People',
      icon: 'group',
      route: '/users',
      exact: true
    }
  ];
}