import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';

import { Accommodation } from '../Accommodation';
import { AccommodationService } from '../services/accommodationService/accommodation.service';

@Component({
  selector: 'app-accommodation',
  templateUrl: './accommodation.component.html',
  styleUrls: ['./accommodation.component.css']
})
export class AccommodationComponent implements OnInit {

  accommodation?: Accommodation;
  guests: number = 1;
  dateInvalid: boolean = false;
  
  range: FormGroup = new FormGroup({
    start: new FormControl(),
    end: new FormControl(),
  });


  constructor(
    private accommodationService: AccommodationService, 
    private router: Router, 
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getAccommodation();
  }
  
  getAccommodation() {
    const id = Number(this.route.snapshot.paramMap.get("id"));
    this.accommodationService.getAccommodation(id)
    .subscribe(
      (accommodation) => (this.accommodation = accommodation)
      );
  }

  toPayment() {
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

  getErrorMessage() {
    if ((this.range.valid)) {
      return "As datas devem ser diferentes."
    } else {
      return "Por favor, selecione as datas."
    }
  }

  validDate() {
    return ((this.range.valid) && (this.range.value["end"].toJSON() != this.range.value["start"].toJSON()));
  }

  stringifyPrice(price: number): string {
    return `R$ ${price.toLocaleString("pt-BR", { maximumFractionDigits: 2, minimumFractionDigits: 2 })}`;
  }

  plusGuests() {
    this.guests++;
  }

  minusGuests() {
    this.guests--;
  }

}
