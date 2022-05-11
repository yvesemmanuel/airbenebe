import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Accommodation } from '../../interfaces/Accommodation';
import { AddAccommodation } from 'src/app/interfaces/addinterface/AddAccommodation';

@Injectable({
  providedIn: 'root'
})
export class AccommodationService {

  private accommodationUrl = 'http://localhost:3333/accommodations'

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) {}

  getAccommodations(): Observable<Accommodation[]> {
    return this.http.get<Accommodation[]>(this.accommodationUrl);
  }

  getAccommodation(id: string): Observable<Accommodation> {
    return this.http.get<Accommodation>(`${this.accommodationUrl}/${id}`);
  }

  addAccommodation(accommodation: AddAccommodation): Observable<Accommodation> {
    return this.http.post<Accommodation>(this.accommodationUrl, accommodation, this.httpOptions);
  }

  getUserAccommodations(id_user: string): Observable<Accommodation[]> {
    return this.http.get<Accommodation[]>(this.accommodationUrl, {
      headers: { 'Content-Type': 'application/json' },
      params: {"id_user": id_user}
    });
  }

  deleteAccommodation(id: string): Observable<Accommodation> {
    return this.http.delete<Accommodation>(`${this.accommodationUrl}/${id}`, this.httpOptions);
  }

  getCityAccommodations(city: string): Observable<Accommodation[]> {
    return this.http.get<Accommodation[]>(`${this.accommodationUrl}/city/${city}`);
  }
}
