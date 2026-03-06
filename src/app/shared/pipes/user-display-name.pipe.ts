import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'userDisplayName',
  standalone: true
})
export class UserDisplayNamePipe implements PipeTransform {

  transform(user: { username: string } | null): string {
    if (!user) {
      return 'Guest';
    }
    const username = user.username;

    return username.charAt(0).toUpperCase() + username.slice(1);
  }
}