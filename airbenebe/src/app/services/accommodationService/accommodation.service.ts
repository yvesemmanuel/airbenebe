import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Accommodation } from '../../Accommodation';

@Injectable({
  providedIn: 'root'
})
export class AccommodationService {

  private accommodationUrl = 'http://localhost:3000/accommodations'

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) {}

  getAccommodations(): Observable<Accommodation[]> {
    return this.http.get<Accommodation[]>(this.accommodationUrl);
  }

  getAccommodation(id: number): Observable<Accommodation> {
    return this.http.get<Accommodation>(`${this.accommodationUrl}/${id}`);
  }

  addAccommodation(accommodation: Accommodation): Observable<Accommodation> {
    return this.http.post<Accommodation>(this.accommodationUrl, accommodation, this.httpOptions);
  }

  deleteAccommodation(id: number): Observable<Accommodation> {
    return this.http.post<Accommodation>(`${this.accommodationUrl}/${id}`, this.httpOptions);
  }
}
