import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NotificationService } from '../services/notificationService/notification.service';

@Component({
  selector: 'app-confirm-delete-dialog',
  templateUrl: './confirm-delete-dialog.component.html',
  styleUrls: ['./confirm-delete-dialog.component.css']
})
export class ConfirmDeleteDialogComponent implements OnInit {
  
  constructor(
  @Inject(MAT_DIALOG_DATA) 
  public data: any,
  public dialogRef: MatDialogRef<ConfirmDeleteDialogComponent>,
  private notificationService: NotificationService) { }

  ngOnInit(): void {
  }
  
  delete() {
    this.data.deleteFunction();

    const start = this.stringifyDate(new Date(this.data.rental.start_date));
    const end = this.stringifyDate(new Date(this.data.rental.end_date));
    this.notificationService.addNotification({
      "id_user": this.data.rental.accommodation.id_user,
      "date": new Date().toJSON(),
      "show_date": new Date().toJSON(),
      "message": "O aluguel de " + this.data.rental.accommodation.title + " agendado para " + start + " até " + end + " foi cancelado."
    }).subscribe({
      error: err => console.log(err)
    });

    this.closeDialog()
  }

  stringifyDate(date: Date): string {
    return date.toLocaleDateString("pt-Br");
  }

  closeDialog() {
    this.dialogRef.close()
  }

}
