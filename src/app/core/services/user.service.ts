import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UserService {
  private http = inject(HttpClient);

  getUsers(results = 10, page = 1) {
    return this.http
      .get(`https://randomuser.me/api/?results=${results}&page=${page}`)
      .pipe(
        map((res: any) => ({
          results: res.results,
          info: res.info,
        }))
      );
  }
}