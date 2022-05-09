import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Rental } from '../interfaces/Rental';
import { RentalService } from '../services/rentalService/rental.service';

@Component({
  selector: 'app-edit-date-dialog',
  templateUrl: './edit-date-dialog.component.html',
  styleUrls: ['./edit-date-dialog.component.css']
})
export class EditDateDialogComponent implements OnInit {
  range: FormGroup = new FormGroup({
    start: new FormControl(this.data.start_date),
    end: new FormControl(this.data.end_date),
  });
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
  public dialogRef: MatDialogRef<EditDateDialogComponent>,
  private rentalService: RentalService,
  ) { }
  minDate: Date = new Date();
  maxDate: Date = new Date(new Date().setFullYear(new Date().getFullYear() + 1));

  accRentals: Rental[] = [];

  myFilter = (d: Date | null): boolean => {
    const date = (d || new Date());
    return this.enableDate(date);
  };

  ngOnInit(): void {
    const id = this.data.accommodation.id;
    this.getAccomodationRentals(id);
  }

  getAccomodationRentals(id: string): void {
    this.rentalService.getAccomodationRentals(id).subscribe(rentals => {
      this.accRentals = rentals;
      console.log(this.accRentals);
    });
   }


  enableDate(date: Date): boolean {
    for (let rental of this.accRentals.filter(r => r.id != this.data.id)) {
      const start = new Date(rental.start_date);
      const end = new Date(rental.end_date);
      if ((start <= date) && (date <= end)) {
        return false
      }
    }
    return true
  }
  
  changeDate(){
    const start = this.range.value['start'].toJSON();
    const end = this.range.value['end'].toJSON();
    this.rentalService.updateRental(this.data.id, start, end).subscribe({
      error: err => console.log(err)
    });
    this.closeDialog();
  }

  startDateChanged(e: any) {
    const date = e.value;
    if (date != null) {
      let min = this.maxDate;
      for (let rental of this.accRentals.filter(r => r.id != this.data.id)) {
        const start = new Date(rental.start_date);
        if ((date < start) && (start < min)) {
          min = start
        }
      }
      this.maxDate = min;
    } else {
      this.maxDate = new Date(new Date().setFullYear(new Date().getFullYear() + 1));
    }
  }

  closeDialog () {
    this.dialogRef.close()
  }

  clearSelection() {
    this.range.reset();
    this.maxDate = new Date(new Date().setFullYear(new Date().getFullYear() + 1));
  }

}
