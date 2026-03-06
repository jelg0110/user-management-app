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
  private router = inject(Router);

  users = signal<any[]>([]);
  loading = signal(false);

  displayedColumns = ['picture', 'name', 'email', 'phone'];

  page = signal(0);
  resultsPerPage = 10;
  totalResults = signal(100);

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
        }));
        this.users.set(mappedUsers);
        // this.totalResults.set(data.info?.results || mappedUsers.length);
        this.loading.set(false);
      },
      error: () => this.loading.set(false),
    });
  }

  handlePageEvent(event: PageEvent) {
    // console.log(event);
    if (event.pageIndex >= 0) {
      this.page.set(event.pageIndex);
      this.loadUsers();
    }
  }
  
  onRowClick(user: any) {
    this.router.navigate(['/users', user.email]);
  }
}