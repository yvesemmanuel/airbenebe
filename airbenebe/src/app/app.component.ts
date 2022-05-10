import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title = 'airbenebe';
  isLogged: boolean = true;
  hideHeader: boolean = false;

  constructor(private router: Router) {
    this.router.events.subscribe(routerEvent => {
      if (routerEvent instanceof NavigationEnd) {
        this.hideHeader = this.router.url == '/login' || this.router.url == '/register';
      }
    });
  }

  ngOnInit(): void {
    this.isLogged = window.localStorage.getItem("loggedID") != null;
  }

  logout(){
    window.localStorage.removeItem("loggedID")
    this.isLogged = true;
  }
}