import Rental from '../../models/Rental';
import FakeRentalRepository from '../../repositories/fakes/FakeRentalRepository';
import RentalRepository from '../../repositories/RentalRepository';

type CreateRentalType = {
    id_user: string;
    id_accommodation: string;
    guests: number;
    price: number;
    nights: number;
    purchase_date: string;
    start_date: string;
    end_date: string;
};

type ResponseType = {
    error: boolean,
    message: string,
    data: Rental | undefined,
}

class CreateRentalService {

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
    }: CreateRentalType): ResponseType {
        const validDate = this.rentalRepository.validDate(id_accommodation, start_date, end_date);

        if (!validDate) {
            return {
                error: true,
                message: "Date already reserved.",
                data: undefined,
            }
        }

        const rental = this.rentalRepository.create({
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
            message: "Rental created successfully.",
            data: rental,
        };
    };
};

export default CreateRentalService;