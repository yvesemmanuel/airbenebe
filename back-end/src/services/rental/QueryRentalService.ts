import Rental from '../../models/Rental';
import FakeRentalRepository from '../../repositories/fakes/FakeRentalRepository';
import RentalRepository from '../../repositories/RentalRepository';

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
type ResponseType = {
    error: boolean,
    message: string,
    data: Rental[],
}

class QueryRentalService {

    constructor(private rentalRepository: RentalRepository | FakeRentalRepository = new RentalRepository().getInstance()) {
        this.rentalRepository = rentalRepository;
    }

    public execute({
        id_user,
        id_accommodation,
        guests,
        price,
        nights,
        purchase_date,
        start_date,
        end_date
    }: QueryRentalType): ResponseType {
        const foundRentals = this.rentalRepository.query({
            id_user,
            id_accommodation,
            guests,
            price,
            nights,
            purchase_date,
            start_date,
            end_date
        });

        return {
            error: false,
            message: "Rentals found.",
            data: foundRentals,
        };

    }
}

export default QueryRentalService;