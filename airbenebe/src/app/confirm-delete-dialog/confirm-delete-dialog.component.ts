import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-delete-dialog',
  templateUrl: './confirm-delete-dialog.component.html',
  styleUrls: ['./confirm-delete-dialog.component.css']
})
export class ConfirmDeleteDialogComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
  public dialogRef: MatDialogRef<ConfirmDeleteDialogComponent>
  ) { }

  
  delete(){
    this.data.deleteFunction()
    this.closeDialog()
  }

  closeDialog() {
    this.dialogRef.close()
  }
  ngOnInit(): void {
  }

}
