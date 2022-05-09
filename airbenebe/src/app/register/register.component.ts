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
   
  }
  
}