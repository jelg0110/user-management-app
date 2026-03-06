import { Component, inject, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { A11yModule } from "@angular/cdk/a11y";
import { UserService } from '@core/services/user.service';
import { UserDetailService } from '@core/services/user-detail.service';
import { MediaMatcher } from '@angular/cdk/layout';

@Component({
  selector: 'app-user-table',
  standalone: true,
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.scss'],
  imports: [
    CommonModule,
    MatCardModule,
    MatTableModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    A11yModule
  ],
})
export class UserTableComponent implements OnInit {
  private userService = inject(UserService);
  private userDetailService = inject(UserDetailService);
  private router = inject(Router);
  private media = inject(MediaMatcher);

  users = signal<any[]>([]);
  loading = signal(false);

  displayedColumns = signal<string[]>(['picture', 'name', 'username', 'gender', 'email', 'phone']);

  page = signal(0);
  resultsPerPage = 10;
  totalResults = signal(100);

  private mobileQuery: MediaQueryList;
  private tabletQuery: MediaQueryList;

  constructor() {
    this.mobileQuery = this.media.matchMedia('(max-width: 600px)');
    this.tabletQuery = this.media.matchMedia('(max-width: 900px)');

    this.updateColumns();

    this.mobileQuery.addEventListener('change', () => this.updateColumns());
    this.tabletQuery.addEventListener('change', () => this.updateColumns());
  }

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.loading.set(true);
    const results = this.resultsPerPage;
    const pageNum = this.page() + 1;

    this.userService.getUsers(results, pageNum).subscribe({
      next: (data) => {
        const mappedUsers = data.results.map((u: any) => ({
          picture: u.picture.thumbnail,
          name: `${u.name.first} ${u.name.last}`,
          email: u.email,
          phone: u.phone,
          username: u.login.username,
          gender: u.gender,
          age: u.dob.age,
          location: `${u.location.state}, ${u.location.city}, ${u.location.country}`,
        }));
        this.users.set(mappedUsers);
        // this.totalResults.set(data.info?.results || mappedUsers.length);
        this.loading.set(false);
      },
      error: () => this.loading.set(false),
    });
  }

  private updateColumns() {
    if (this.mobileQuery.matches) {
      this.displayedColumns.set(['picture', 'name', 'username']);
    } else if (this.tabletQuery.matches) {
      this.displayedColumns.set(['picture', 'name', 'email', 'phone']);
    } else {
      this.displayedColumns.set(['picture', 'name', 'username', 'gender', 'email', 'phone']);
    }
  }

  handlePageEvent(event: PageEvent) {
    // console.log(event);
    if (event.pageIndex >= 0) {
      this.page.set(event.pageIndex);
      this.loadUsers();
    }
  }

  onRowClick(user: any) {
    this.userDetailService.selectUser(user);
    this.router.navigate(['/users', user.email]);
  }
}