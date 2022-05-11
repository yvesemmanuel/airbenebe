import { v4 } from 'uuid';

import Rental from '../../models/Rental';

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

type QueryRentalType = {
    id_user: string;
    id_accommodation: string;
    guests: string;
    price: string;
    nights: string;
    purchase_date: string;
    start_date: string;
    end_date: string;
    [key: string]: string;
};

class FakeRentalRepository {
    private rentals: Rental[] =  [];
    private static instance: FakeRentalRepository;

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
        const val_start = start_date;
        const val_end = end_date;
        for (let rental of this.rentals.filter(rental => rental.id_accommodation == id_accommodation)) {
            const start = rental.start_date
            const end = rental.end_date;
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
            const nights = (new Date(newEnd).getTime() - new Date(newStart).getTime()) / 86400000;

            foundRental.start_date = newStart;
            foundRental.end_date = newEnd;
            foundRental.price = (foundRental.price / foundRental.nights) * nights
            foundRental.nights = nights

            return foundRental;
        }

        return undefined;
    }

    public userRentals(id_user: string): Rental[] {
        const foundRentals = this.rentals.filter(rental => rental.id_user == id_user);
        return foundRentals;
    }

    public query(queryparams: QueryRentalType): Rental[] {
        const foundRentals = this.rentals.filter(rental => Object.keys(queryparams).filter(k => queryparams[k]).every(param => rental[param as keyof typeof rental] == queryparams[param]));
        return foundRentals;
    }

    public getInstance(): FakeRentalRepository {
        if (!FakeRentalRepository.instance) {
            FakeRentalRepository.instance = new FakeRentalRepository();
        }

        return FakeRentalRepository.instance;
    }
}

export default FakeRentalRepository