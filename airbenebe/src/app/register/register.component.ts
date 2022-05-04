import { NgModule, Component, OnInit } from "@angular/core";
import { UserService } from "../services/userService/user.service";
import { User } from "../interfaces/User";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"]
})
export class RegisterComponent implements OnInit {
  constructor(private userService: UserService) { };

  ngOnInit(): void {
    this.userService.getUsers().subscribe(users => this.users = users, error => alert(error));
  }

  user: User = new User();
  termsAccepted: boolean = false;
  users: User[] = [];

  userRegister(user: User): void {
    if (this.validForms(user) && this.termsAccepted) {
      if (this.invalidEmail(user) || this.emailAlreadyUsed(user.email)) {
        this.user.email = "";
        alert("Email inválido!");
      }
      else if (this.user.password != this.user.passwordConfirmation) {
        this.user.passwordConfirmation = "";
        alert("As senhas não são iguais!");
      }
      else {
        this.userService.register(user).subscribe(user_ => {
          alert("Conta criada com sucesso! Basta logar.");
          var slides = document.getElementById("cancelbtn");
          slides?.click();
        }, error => alert(error));
      }
    } else {
      alert("Preencha todas as informações!");
    }
  }

  accountCreated() {
    alert("Conta criada com sucesso! Basta logar.");
    var slides = document.getElementById("cancelbtn");
    slides?.click();
  }

  emailAlreadyUsed(email: string): boolean {
    return !!this.users.find(user => user.email == email);
  }

  invalidEmail(user: User) {
    var validEmail = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    return !user.email.match(validEmail);
  }

  validForms(user: User) {
    return user.name !== "" && user.email !== "" && user.password !== "" && user.passwordConfirmation !== "";
  }

}