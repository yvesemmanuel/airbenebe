import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Rental } from '../../interfaces/Rental';
import { AddRental } from 'src/app/interfaces/addinterface/AddRental';

@Injectable({
  providedIn: 'root'
})
export class RentalService {

  private rentalUrl = 'http://localhost:3333/rentals'

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) {}

  getRentals(): Observable<Rental[]> {
    return this.http.get<Rental[]>(this.rentalUrl);
  }

  getRental(id: string): Observable<Rental> {
    return this.http.get<Rental>(`${this.rentalUrl}/${id}`);
  }

  getAccomodationRentals(id_accomodation: string): Observable<Rental[]> {
    return this.http.get<Rental[]>(this.rentalUrl, {
      headers: { 'Content-Type': 'application/json' },
      params: {"id_accommodation": id_accomodation}
    });
  }

  getUserRentals(id_user: string): Observable<Rental[]> {
    return this.http.get<Rental[]>(this.rentalUrl, {
      headers: { 'Content-Type': 'application/json' },
      params: {"id_user": id_user}
    });
  }

  addRental(rental: AddRental): Observable<Rental> {
    return this.http.post<Rental>(this.rentalUrl, rental, this.httpOptions);
  }

  updateRental(id: string, newStart: string, newEnd: string): Observable<Rental> {
     return this.http.put<Rental>(`${this.rentalUrl}/${id}`,{
       newStart, newEnd
      }, this.httpOptions);
  }

  deleteRental(id: string): Observable<void> {
    return this.http.delete<void>(`${this.rentalUrl}/${id}`, this.httpOptions);
  }
}
