import Rental from '../../models/Rental';
import RentalRepository from '../../repositories/RentalRepository';

type ResponseType = {
    error: boolean,
    message: string,
    data: Rental[] | undefined,
}

class UserRentalService {
    public execute(id_user: string): ResponseType {
        const rentalRepository = new RentalRepository().getInstance();

        const foundRentals = rentalRepository.userRentals(id_user);

        return {
            error: false,
            message: "Rentals found.",
            data: foundRentals,
        };

    }
}

export default UserRentalService;