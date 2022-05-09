import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentGuard implements CanActivate {

  constructor(private router: Router) { }

  canActivate(next: ActivatedRouteSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const regex = new RegExp('/accommodation/[a-f0-9]{8}-([a-f0-9]{4}-){3}[a-f0-9]{12}(/payment)?$');

    if ((regex.test(this.router.url)) && (next.routeConfig != null) && (next.routeConfig.path === ':id/payment')) {
        return true;
    } else {
      this.router.navigate([`/accommodation/${next.paramMap.get("id")}`]);
      return false;
    }
  }
}
