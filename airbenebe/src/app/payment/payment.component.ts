import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { Accommodation } from '../interfaces/Accommodation';
import { AccommodationService } from '../services/accommodationService/accommodation.service';

import { Rental } from '../interfaces/Rental';
import { AddRental } from '../interfaces/addinterface/AddRental';
import { RentalService } from '../services/rentalService/rental.service';

import { AddNotification } from '../interfaces/addinterface/AddNotification';
import { NotificationService } from '../services/notificationService/notification.service';


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
    private route: ActivatedRoute,
    private notificationService: NotificationService
  ) { }

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    const id = String(this.route.snapshot.paramMap.get("id"));
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

    this.nights = (this.end.getTime() - this.start.getTime()) / 86400000;
  }

  onSubmit() {
    const id_user = window.localStorage.getItem("loggedID");
    if (this.paymentForm.valid && id_user) {
      const rental: AddRental = {
        "id_user": id_user,
        "id_accommodation": this.accommodation.id,
        "guests": this.guests,
        "price": this.accommodation.price * this.nights,
        "nights": this.nights,
        "purchase_date": new Date().toJSON(),
        "start_date": this.start.toJSON(),
        "end_date": this.end.toJSON(),
      }

      this.rentalService.addRental(rental).subscribe({
        next: nxt => {
          const show: string = new Date(this.start.setDate(this.start.getDate() - 1)).toJSON();
          this.notificationService.addNotification({
            "id_user": id_user,
            "id_rental": nxt.id,
            "date": new Date().toJSON(),
            "show_date": show,
            "message": "Falta 1 dia para o seu check-in em " + this.accommodation.title + "!"
          }).subscribe({
            error: err => console.log(err)
          });
        },
        error: err => console.log(err)
      })

      const start = this.stringifyDate(this.start);
      const end = this.stringifyDate(this.end);
      this.notificationService.addNotification({
        "id_user": this.accommodation.id_user,
        "id_rental": "",
        "date": new Date().toJSON(),
        "show_date": new Date().toJSON(),
        "message": "Um usuário alugou " + this.accommodation.title + " do dia " + start + " até " + end + "."
      }).subscribe({
        error: err => console.log(err)
      });

      this.router.navigate(['/myrentals']);
    }
  }

  stringifyPrice(price: number): string {
    return `R$ ${price.toLocaleString("pt-BR", { maximumFractionDigits: 2, minimumFractionDigits: 2 })}`;
  }

  stringifyDate(date: Date): string {
    return date.toLocaleDateString("pt-Br");
  }
}
