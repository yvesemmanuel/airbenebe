import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'airbenebe';
  isLogged: boolean = false;
  hideNav: boolean = false;

  constructor(private router: Router) {
    router.events.subscribe(value => {
      this.hideNav = router.url == '/login' || router.url == '/register';
    });
  }
}