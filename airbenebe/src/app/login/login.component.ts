import { Component, OnInit } from '@angular/core';
import { UserService } from "../services/userService/user.service";
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(private userService: UserService, private router: Router) { };

  ngOnInit(): void {
  }

  hide: boolean = true;
  invalidUser: boolean = false;
  loginForm: FormGroup = new FormGroup({ email: new FormControl("", [Validators.email]), password: new FormControl("") });

  login() {
    if (this.loginForm.valid) {

      this.userService.login(this.loginForm.value["email"], this.loginForm.value["password"]).subscribe({
        next: (user:any) => {
          window.localStorage.setItem("loggedID", user.id);
          this.router.navigate(["/listing"]);
        },
        error: e => this.invalidUser = true
      });
    }
  }

}
