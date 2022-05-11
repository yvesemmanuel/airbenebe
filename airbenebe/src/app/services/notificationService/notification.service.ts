import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Notification } from '../../interfaces/Notification';
import { AddNotification } from 'src/app/interfaces/addinterface/AddNotification';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private notificationUrl = 'http://localhost:3333/notifications'

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) {}

  getUserNotifications(user_id: string): Observable<Notification[]> {
    return this.http.get<Notification[]>(this.notificationUrl, {
      headers: { 'Content-Type': 'application/json' },
      params: {"user_id": user_id}
    });
  }

  addNotification(notification: AddNotification): Observable<Notification> {
    return this.http.post<Notification>(this.notificationUrl, notification, this.httpOptions);
  }

}
