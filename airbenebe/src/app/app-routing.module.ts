import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LandingComponent } from './landing/landing.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AccommodationComponent } from './accommodation/accommodation.component';
import { PaymentComponent } from './payment/payment.component';
import { AccommodationDetailComponent } from './accommodation-detail/accommodation-detail.component';
import { ListingComponent } from './listing/listing.component';

import { PaymentGuard } from './guards/payment.guard';
import { RentalComponent } from './rental/rental.component';
import { AddListingComponent } from './add-listing/add-listing.component';
import { UserAccommodationsComponent } from './user-accommodations/user-accommodations.component';

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
    path: 'add-listing',
    component: AddListingComponent
  },
  {
    path: "myrentals",
    component: RentalComponent,
  },
  {
    path: "myaccommodations",
    component: UserAccommodationsComponent,
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
  },
  {
    path: 'listings',
    component: ListingComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}