import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { Accommodation } from '../Accommodation';
import { AccommodationService } from '../services/accommodationService/accommodation.service';

import { Rental } from '../Rental';
import { RentalService } from '../services/rentalService/rental.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  accommodation!: Accommodation;
  start!: Date;
  end!: Date;
  nights!: number;
  guests!: number;
  paymentValid: boolean = true;


  paymentForm = new FormGroup({
    method: new FormControl('', [
      Validators.required
    ]),
    card_number: new FormControl('', [
      Validators.required,
      Validators.minLength(16),
      Validators.pattern('\\d*')
    ]),
    card_name: new FormControl('', [
      Validators.required,
      Validators.pattern('^([a-zA-Z]+\\s)*[a-zA-Z]+$')
    ]),
    expiry: new FormControl('', [
      Validators.required,
      Validators.pattern('^(0[1-9]|1[0-2])[0-9]{2}$'),
      Validators.minLength(4)
    ]),
    cvv: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.pattern('\\d*')
    ]),
  });
  
  constructor(
    private accommodationService: AccommodationService, 
    private rentalService: RentalService,
    private router: Router,
    private route: ActivatedRoute
    ) { }

  ngOnInit(): void {
    this.getData();
  }
  
  getData() {
    const id = Number(this.route.snapshot.paramMap.get("id"));
    this.accommodationService.getAccommodation(id).subscribe(
      (accommodation) => (this.accommodation = accommodation)
    );
    
    this.route.queryParams.subscribe(
        (queryParams) => {
          this.guests = Number(queryParams["guests"]);
          this.start = new Date(queryParams["start"]);
          this.end = new Date(queryParams["end"]);
        }
    );

    this.nights = (this.end.getTime() - this.start.getTime())/86400000;
  }

  onSubmit() {
    if (this.paymentForm.valid) {
      const rental: Rental = {
        "id": this.genId(),
        "id_user": 2,
        "id_accommodation": this.accommodation.id,
        "guests": this.guests,
        "price": this.accommodation.price * this.nights,
        "nights": this.nights,
        "purchase_date": new Date(),
        "start_date": this.start,
        "end_date": this.end,
      }

      this.rentalService.addRental(rental).subscribe({
        error: err => console.log(err)
      })
      
      this.router.navigate(['']);
    }
  }

  genId() {
    let nextId = 0; 
    this.rentalService.getRentals().subscribe({
      next: (rentals: Rental[]) => {
        nextId = rentals.length > 0 ? Math.max(...rentals.map(rental => rental.id)) + 1 : 1;
      }
    })
    return nextId
  }

  stringifyPrice(price: number): string {
    return `R$ ${price.toLocaleString("pt-BR", { maximumFractionDigits: 2, minimumFractionDigits: 2 })}`;
  }

  stringifyDate(date: Date): string {
    return date.toLocaleDateString("pt-Br");
  }
}
