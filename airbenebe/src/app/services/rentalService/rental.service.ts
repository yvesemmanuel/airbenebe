import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Rental } from '../../Rental';

@Injectable({
  providedIn: 'root'
})
export class RentalService {

  private rentalUrl = 'http://localhost:3000/rentals'

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) {}

  getRentals(): Observable<Rental[]> {
    return this.http.get<Rental[]>(this.rentalUrl);
  }

  getRental(id: number): Observable<Rental> {
    return this.http.get<Rental>(`${this.rentalUrl}/${id}`);
  }

  addRental(rental: Rental): Observable<Rental> {
    return this.http.post<Rental>(this.rentalUrl, rental, this.httpOptions);
  }

  deleteRental(id: number): Observable<Rental> {
    return this.http.post<Rental>(`${this.rentalUrl}/${id}`, this.httpOptions);
  }
}
