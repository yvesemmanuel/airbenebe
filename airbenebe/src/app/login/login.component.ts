import { Component, OnInit } from '@angular/core';
import { UserService } from "../services/userService/user.service";
import { User } from '../interfaces/User'


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(private userService: UserService) { };

  ngOnInit(): void {
    this.userService.getUsers().subscribe(users => this.users = users, error => alert(error));
  }

  user: User = new User();
  users: User[] = [];

  userLogin(user: User): void {
    if (this.validForms(user)) {
      this.userService.getUsers().subscribe(users => { this.users = users; this.checkUserInfo(user); }, error => alert(error));
    } else {
      alert("Preencha todas as informações!");
    }
  }

  checkUserInfo(user: User) {
    var userInfo = this.users.find(u => u.email == user.email);
    if (userInfo) {
      if (userInfo.password === user.password) {
        console.log("LOGADO");
      } else {
        alert("Senha incorreta!");
      }
    } else {
      alert("Usuário não cadastrado!");
    }
  }

  validForms(user: User) {
    return user.email !== "" && user.password !== "";
  }

}
