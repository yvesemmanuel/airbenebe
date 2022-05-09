import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Accommodation } from '../interfaces/Accommodation';
import { Rental } from '../interfaces/Rental';
import { AccommodationService } from '../services/accommodationService/accommodation.service';
import { RentalService } from '../services/rentalService/rental.service';

import { MatDialog } from '@angular/material/dialog';
import { EditDateDialogComponent } from '../edit-date-dialog/edit-date-dialog.component';
import { ConfirmDeleteDialogComponent } from '../confirm-delete-dialog/confirm-delete-dialog.component';

@Component({
  selector: 'app-rental',
  templateUrl: './rental.component.html',
  styleUrls: ['./rental.component.css']
})
export class RentalComponent implements OnInit {
  constructor(
    private rentalService: RentalService,
    public matDialog: MatDialog,
    private accommodationService: AccommodationService,
    private route: ActivatedRoute) { }


  public rentals: any[] = []
  public accommodation!: Accommodation

  openEditDateDialog(data: any): any {
    this.matDialog.open(EditDateDialogComponent, {
      width: '300px',
      data,
      maxHeight: '200px',
    });
    // dialogRef.afterClosed().subscribe(() => this.refreshData());
  }
  cancelResevation(id: string): any {

    const data = {
      id,
      deleteFunction: () => this.rentalService.deleteRental(id).subscribe(rental => {
        console.log("rental", rental)
      })
    }

    const dialogRef = this.matDialog.open(ConfirmDeleteDialogComponent, {
      width: '270px',
      data,
      maxHeight: '150px',
    });
    dialogRef.afterClosed().subscribe(() => this.getRentals());
  }

  closeDate(start:string){
    
    const date:Date = new Date(start);
    const today:Date = new Date();
    const days = (date.getTime()-today.getTime())/86400000;
    return days < 7;
    
    
  }



  ngOnInit(): void {
    this.getRentals();
    

  }

  accRentals: Rental[] = [];

  formatDate(date: string) {
    const formatedDate = date,
      [yyyy, mm, dd, hh, mi] = date.split(/[/:\-T]/);
    return `${dd}/${mm}/${yyyy}`;
  }

  stringifyDate(date: Date): string {
    return date.toLocaleDateString("pt-Br");
  }


  getAccomodationRentals(id: string): void {
    this.rentalService.getAccomodationRentals(id).subscribe(rentals => {
      this.accRentals = rentals;
    });
  }




  stringifyPrice(price: number): string {
    return `R$ ${price.toLocaleString("pt-BR", { maximumFractionDigits: 2, minimumFractionDigits: 2 })}`;
  }

  getRentals(): void {
    const id = String(this.route.snapshot.paramMap.get("id"));
    this.rentalService.getUserRentals(id).subscribe(rentals => {
      rentals.forEach(rental => {
        this.getAccommodation(rental.id_accommodation, rental)
      });
      this.rentals = rentals
    });
  }

  getAccommodation(id: string, rental: any): void {
    this.accommodationService.getAccommodation(id).subscribe(accommodation => {
      rental.accommodation = accommodation;
    });
  }


}
