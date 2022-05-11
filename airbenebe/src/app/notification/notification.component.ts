import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../services/notificationService/notification.service'
import { Notification } from '../interfaces/Notification';


@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {

  constructor(private notificationService: NotificationService) { };

  id_user: string = "";
  notifications: Notification[] = [];
  notification!: Notification;

  ngOnInit(): void {
    const id = window.localStorage.getItem("loggedID");
    if (id) {
      this.id_user = id;
      this.getNotifications(id);
    }

  }

  getNotifications(id: string): void {
    this.notificationService.getUserNotifications(id).subscribe(notifications => {
      this.notifications = notifications;
    })
  }

  formatDate(date: string): string {
    const formatedDate = date,
      [yyyy, mm, dd, hh, mi] = date.split(/[/:\-T]/);
    return `${dd}/${mm}/${yyyy}`;
  }
  
}
