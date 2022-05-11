import { Component, OnInit } from '@angular/core';
import { Accommodation } from '../interfaces/Accommodation';
import { AccommodationService } from '../services/accommodationService/accommodation.service';

@Component({
  selector: 'app-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.css']
})
export class ListingComponent implements OnInit {

  constructor(private accommodationService: AccommodationService) { }
  
  public accommodations: Accommodation[] = [];
  public city: string = "";

  ngOnInit(): void {
    this.getAccommodations();
  }

  getAccommodations(): void {
    this.accommodationService.getAccommodations().subscribe(result => {
      this.accommodations = result;
    })
  }

  stringifyPrice(price: number): string {
    return `R$ ${price.toLocaleString("pt-BR", { maximumFractionDigits: 2, minimumFractionDigits: 2 })}`;
  }

  citySearch(): void {
    this.accommodationService.getCityAccommodations(this.city).subscribe(result => {
      this.accommodations = result;
    })
  }

  clearSearch(): void {
    this.getAccommodations();
    this.city = "";
  }
}
