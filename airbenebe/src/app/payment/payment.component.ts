import { Component, OnInit } from '@angular/core';

import { FormGroup, FormControl, Validators } from '@angular/forms';

import { Accommodation } from '../Accommodation';
import { Rental } from '../Rental';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  paymentForm = new FormGroup({
    method: new FormControl('', [
      Validators.required
    ]),
    card_number: new FormControl('', [
      Validators.required
    ]),
    card_name: new FormControl('', [
      Validators.required
    ]),
    expiry: new FormControl('', [
      Validators.required
    ]),
    cvv: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(3)
    ]),
  });

  accommodation: Accommodation = {
    "id": 1,
    "title": "Casa na Praia maior de todas",
    "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent magna sapien, bibendum in lectus viverra, iaculis elementum ante. Pellentesque consequat, nisi nec accumsan tristique, arcu nisi aliquam odio, vitae tincidunt nisl lectus egestas lacus. Nunc sagittis mauris quis dui maximus, a ultricies arcu lacinia. In varius consectetur consequat. Nunc commodo risus porta lorem varius egestas. Cras a consectetur libero. Curabitur vehicula dui in urna porttitor, sit amet aliquam lorem imperdiet. Maecenas dictum eget dui vel porta. Fusce rutrum pulvinar velit nec efficitur. Etiam dignissim, nulla ac laoreet posuere, felis odio blandit dui, in tincidunt mi sem nec nisl. Praesent id semper nulla, a auctor erat. Curabitur consequat massa at mauris porttitor, nec semper nisi accumsan. Nulla et dictum purus. Praesent imperdiet neque sapien, vitae imperdiet tellus consequat nec. Sed mollis accumsan quam, eget pretium nisi auctor in. Sed consequat risus eget odio efficitur facilisis.",
    "type": "Casa",
    "state": "Pernambuco",
    "city": "Recife",
    "street": "Rua Ondina",
    "number": 214,
    "zipcode": "50000-000",
    "capacity": 3,
    "rooms": 2,
    "bathrooms": 2,
    "price": 480
  }
  
  nights = 2;
  guests = 3;
  start = new Date(2022, 4, 4);
  end = new Date(2022, 4, 6)
  
  constructor() { }

  ngOnInit(): void {
  }

  stringifyPrice(price: number) {
    return `R$ ${price.toLocaleString("pt-BR", { maximumFractionDigits: 2, minimumFractionDigits: 2 })}`;
  }

  stringifyDate(date: Date | null) {
    return date != null ? date.toLocaleDateString("pt-Br") : "aaa";
  }
}
