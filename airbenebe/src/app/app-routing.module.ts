import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LandingComponent } from './landing/landing.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AccommodationComponent } from './accommodation/accommodation.component';
import { PaymentComponent } from './payment/payment.component';
import { AccommodationDetailComponent } from './accommodation-detail/accommodation-detail.component';
import { ListingComponent } from './listing/listing.component';
import { RentalComponent } from './rental/rental.component';
import { AddAccommodationComponent } from './add-accommodation/add-accommodation.component';
import { UserAccommodationsComponent } from './user-accommodations/user-accommodations.component';

import { PaymentGuard } from './guards/paymentGuard/payment.guard';
import { AuthGuard } from './guards/authGuard/auth.guard';

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
    component: RegisterComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'add-accommodation',
    component: AddAccommodationComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "myrentals",
    component: RentalComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "myaccommodations",
    component: UserAccommodationsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'accommodation',
    component: AccommodationDetailComponent,
    children: [
      {
        path: ':id',
        component: AccommodationComponent,
        canActivate: [AuthGuard]
      },
      {
        path: ':id/payment',
        component: PaymentComponent,
        canActivate: [AuthGuard, PaymentGuard]
      }
    ]
  },
  {
    path: 'listing',
    component: ListingComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}