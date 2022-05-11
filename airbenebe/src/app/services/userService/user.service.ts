import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { User } from '../../interfaces/User';
// remove it
import { AddUser } from 'src/app/interfaces/addinterface/AddUser';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private loginUrl = 'http://localhost:3333/login';
  private userUrl = 'http://localhost:3333/users'

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  register(email: string, name: string, password: string, password_confirmation: string): Observable<User> {
    return this.http.post<User>(this.userUrl, {email, name, password, password_confirmation}, this.httpOptions);
  }

  login(email: string, password: string): Observable<User> {
    return this.http.post<User>(this.loginUrl, { email, password }, this.httpOptions);
  }

}
