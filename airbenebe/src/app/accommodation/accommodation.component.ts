import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';

import { Accommodation } from '../interfaces/Accommodation';
import { AccommodationService } from '../services/accommodationService/accommodation.service';

import { Rental } from '../interfaces/Rental';
import { RentalService } from '../services/rentalService/rental.service';

@Component({
  selector: 'app-accommodation',
  templateUrl: './accommodation.component.html',
  styleUrls: ['./accommodation.component.css']
})
export class AccommodationComponent implements OnInit {

  accommodation!: Accommodation;
  accRentals: Rental[] = [];
  guests: number = 1;
  dateInvalid: boolean = false;
  
  range: FormGroup = new FormGroup({
    start: new FormControl(),
    end: new FormControl(),
  });

  minDate: Date = new Date();
  maxDate: Date = new Date(new Date().setFullYear(new Date().getFullYear() + 1));

  myFilter = (d: Date | null): boolean => {
    const date = (d || new Date());
    return this.enableDate(date);
  };

  constructor(
    private accommodationService: AccommodationService, 
    private rentalService: RentalService,
    private router: Router, 
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getAccommodation();
  }
  
  getAccommodation(): void {
    const id = String(this.route.snapshot.paramMap.get("id"));
    this.accommodationService.getAccommodation(id).subscribe(accommodation => {
      this.accommodation = accommodation;
      this.getAccomodationRentals(accommodation.id);
    });
  }

  getAccomodationRentals(id: string): void {
    this.rentalService.getAccomodationRentals(id).subscribe(rentals => {
      this.accRentals = rentals;
    });
  }

  toPayment(): void {
    if (this.validDate()) {
      this.router.navigate(['payment'], {relativeTo: this.route, queryParams: {
        guests: this.guests,
        start: this.range.value['start'].toJSON(),
        end: this.range.value['end'].toJSON(),
      }});
    } else {
      this.dateInvalid = true;
    }
  }

  getErrorMessage(): string {
    return (this.range.valid) ? "As datas devem ser diferentes." : "O período deve ser selecionado.";
  }

  enableDate(date: Date): boolean {
    for (let rental of this.accRentals) {
      const start = new Date(rental.start_date);
      const end = new Date(rental.end_date);
      if ((start <= date) && (date <= end)) {
        return false
      }
    }
    return true
  }

  validDate(): boolean {
    return ((this.range.valid) && (this.differentDates(this.range.value["end"], this.range.value["start"])));
  }

  differentDates(d1: Date, d2: Date): boolean {
    return d1.setHours(0, 0, 0) != d2.setHours(0, 0, 0)
  }

  startDateChanged(e: any) {
    const date = e.value;
    if (date != null) {
      let min = this.maxDate;
      for (let rental of this.accRentals) {
        const start = new Date(rental.start_date);
        if ((date < start) && (start < min)) {
          min = start
        }
      }
      this.maxDate = min;
    } else {
      this.maxDate = new Date(new Date().setFullYear(new Date().getFullYear() + 1));
    }
  }

  clearSelection() {
    this.range.reset();
    this.maxDate = new Date(new Date().setFullYear(new Date().getFullYear() + 1));
  }

  stringifyPrice(price: number): string {
    return `R$ ${price.toLocaleString("pt-BR", { maximumFractionDigits: 2, minimumFractionDigits: 2 })}`;
  }

  plusGuests(): void {
    this.guests++;
  }

  minusGuests(): void {
    this.guests--;
  }

  checkOwner(): boolean {
    return window.localStorage.getItem("loggedID") == this.accommodation.id_user;
  }

}
