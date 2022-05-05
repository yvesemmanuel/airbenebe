import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LandingComponent } from './landing/landing.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AccommodationComponent } from './accommodation/accommodation.component';
import { PaymentComponent } from './payment/payment.component';
import { AccommodationDetailComponent } from './accommodation-detail/accommodation-detail.component';

import { PaymentGuard } from './guards/payment.guard';

const routes: Routes = [
  {
    path: '',
    component: LandingComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'accommodation',
    component: AccommodationDetailComponent,
    children: [
      {
        path: ':id',
        component: AccommodationComponent
      },
      {
        path: ':id/payment',
        component: PaymentComponent,
        canActivate: [PaymentGuard]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}