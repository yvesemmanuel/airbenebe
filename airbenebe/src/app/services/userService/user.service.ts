import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { User } from '../../interfaces/User';
import { AddUser } from 'src/app/interfaces/addinterface/AddUser';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userUrl = 'http://localhost:3333/users'

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) {}

  addUser(user: AddUser): Observable<User> {
    return this.http.post<User>(this.userUrl, user, this.httpOptions);
  }
  login(email: string, password: string): Observable<User> {
    return this.http.post<User>('http://localhost:3333/login', {email, password}, this.httpOptions);
  }

}
