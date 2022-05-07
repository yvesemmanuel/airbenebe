import { v4 } from 'uuid';

import Rental from '../models/Rental';

type CreateRentalType = {
    id_user: string;
    id_accommodation: string;
    guests: number;
    price: number;
    nights: number;
    purchase_date: string;
    start_date: string;
    end_date: string;
}

class RentalRepository {
    private rentals: Rental[] = [];
    private static instance: RentalRepository;

    public create({
        id_user,
        id_accommodation,
        guests,
        price,
        nights,
        purchase_date,
        start_date,
        end_date
    }: CreateRentalType): Rental {
        const rental = new Rental();

        rental.id = v4();
        rental.id_user = id_user;
        rental.id_accommodation = id_accommodation;
        rental.guests = guests;
        rental.price = price;
        rental.nights = nights;
        rental.purchase_date = purchase_date;
        rental.start_date = start_date;
        rental.end_date = end_date;

        this.rentals.push(rental);

        return rental;
    }

    public validDate(id_accommodation: string, start_date: string, end_date: string): boolean {
        const val_start = new Date(start_date);
        const val_end = new Date(end_date);
        for (let rental of this.rentals.filter(rental => rental.id_accommodation == id_accommodation)) {
            const start = new Date(rental.start_date);
            const end = new Date(rental.end_date);
            if (((start <= val_start) && (val_start <= end)) || ((start <= val_end) && (val_end <= end))) {
              return false
            }
          }
        return true
    }

    public findById(id: string): Rental | undefined {
        const foundRental = this.rentals.find(rental => rental.id == id);

        return foundRental;
    }

    public delete(id: string): void {
        const filtered = this.rentals.filter(rental => rental.id != id);
        this.rentals = filtered;
    };

    public updateDates(id: string, newStart: string, newEnd: string): Rental | undefined {
        const foundRental = this.rentals.find(rental => rental.id == id);

        if (foundRental) {
            foundRental.start_date = newStart;
            foundRental.end_date = newEnd;

            return foundRental;
        }

        return undefined;
    }

    public userRentals(id_user: string): Rental[] {
        const foundRentals = this.rentals.filter(rental => rental.id_user == id_user);
        return foundRentals;
    }

    public findAll(): Rental[] {
        return this.rentals;
    }

    public getInstance(): RentalRepository {
        if (!RentalRepository.instance) {
            RentalRepository.instance = new RentalRepository();
        }

        return RentalRepository.instance;
    }
}

export default RentalRepository