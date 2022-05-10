import { Component, OnInit } from '@angular/core';
import { Accommodation } from '../interfaces/Accommodation';
import { AccommodationService } from '../services/accommodationService/accommodation.service';

@Component({
  selector: 'app-user-accommodations',
  templateUrl: './user-accommodations.component.html',
  styleUrls: ['./user-accommodations.component.css'],
})
export class UserAccommodationsComponent implements OnInit {
  public accommodations!: Accommodation[];

  constructor(private accommodationService: AccommodationService) {}

  ngOnInit(): void {
    const id = window.localStorage.getItem("loggedID");
    if (id) {
      this.getUserAccommodations(id);
    }
  }

  getUserAccommodations(id: string): void {
    this.accommodationService
      .getUserAccommodations(id)
      .subscribe((accommodations) => {
        this.accommodations = accommodations;
      });
  }

  stringifyPrice(price: number): string {
    return `R$ ${price.toLocaleString("pt-BR", { maximumFractionDigits: 2, minimumFractionDigits: 2 })}`;
  }
}
