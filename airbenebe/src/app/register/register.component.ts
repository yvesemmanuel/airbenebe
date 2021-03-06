import { Component, OnInit } from "@angular/core";
import { UserService } from "../services/userService/user.service";
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"]
})
export class RegisterComponent implements OnInit {
  constructor(private userService: UserService, private router: Router) { };

  ngOnInit(): void {
  }

  hide: boolean = true;
  hide_confirmation: boolean = true;
  invalidUser: boolean = false;
  duplicatedEmail: boolean = false;
  notMatchedPassword: boolean = false;
  registerForm: FormGroup = new FormGroup({ email: new FormControl("", [Validators.email]), name: new FormControl(""), password: new FormControl(""), password_confirmation: new FormControl("") });

  register() {
    if (this.registerForm.valid) {
      this.userService.register(this.registerForm.value["email"], this.registerForm.value["name"], this.registerForm.value["password"], this.registerForm.value["password_confirmation"]).subscribe({
        next: (user: any) => {
          this.router.navigate(["/login"]);
        },
        error: e => {
          this.invalidUser = true;
          if (e.error.message === "Given email already exists.") {
            this.duplicatedEmail = true;
          }
          else if (e.error.message === "Confirmation password don't match.") {
            this.notMatchedPassword = true;
          }
        }
      });
    }
  }

  onMove(): void {
    this.duplicatedEmail = false;
    this.notMatchedPassword = false;
  }

}