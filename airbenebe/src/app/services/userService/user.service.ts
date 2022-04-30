import { Injectable } from '@angular/core';
import { User } from 'src/app/interfaces/User';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userUrl = "http://localhost:3000/users";

  constructor(private http: HttpClient) {}

  addUser(user: User) {
    return this.http.post<User>(this.userUrl, user).toPromise().then(res => console.log(res)).catch(error => window.alert('Deu erro!!'));
  }

  getUsers(){
    return this.http.get<User>(this.userUrl).toPromise().then(res => console.log(res));
  }

}
