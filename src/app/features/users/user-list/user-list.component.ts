import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { UserTableComponent } from '@features/users/user-list/user-table/user-table.component';

@Component({
  selector: 'app-user-list',
  standalone: true,
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
  imports: [
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    UserTableComponent,
  ]
})
export class UserListComponent {
}