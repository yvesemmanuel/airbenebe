import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from 'src/app/interfaces/User';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: 'my-auth-token'
  })
};

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private headers = new Headers({ 'Content-Type': 'application/json' });
  private serverUrl = "http://localhost:3000";

  constructor(private http: HttpClient) { }

  register(user: User): Observable<User> {
    return this.http.post<User>(this.serverUrl + "/user", user, httpOptions).pipe(map(
      res => {
        return res;
      }
    ));
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.serverUrl + "/users").pipe(map(
      res => {
        return res;
      }
    ));;
  }

}
