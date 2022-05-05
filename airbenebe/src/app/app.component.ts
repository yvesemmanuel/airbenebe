import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'airbenebe';
  isLogged: boolean = true;
  hideHeader: boolean = false;

  constructor(private router: Router) {
    this.router.events.subscribe(routerEvent => {
      if (routerEvent instanceof NavigationEnd) {
        this.hideHeader = this.router.url == '/login' || this.router.url == '/register';
        console.log(this.router.url);
      }
    });
  }

  deslogar (){
    this.isLogged = false;
    
  }

}