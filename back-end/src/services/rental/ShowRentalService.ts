import Rental from '../../models/Rental';
import RentalRepository from '../../repositories/RentalRepository';

type ResponseType = {
    error: boolean,
    message: string,
    data: Rental | undefined,
}

class ShowRentalService {
    public execute(id: string): ResponseType {
        const rentalRepository = new RentalRepository().getInstance();

        const foundRental = rentalRepository.findById(id);

        if (foundRental) {
            return {
                error: false,
                message: "Rental founded.",
                data: foundRental,
            };
        }

        return {
            error: true,
            message: "Rental don't exists.",
            data: undefined,
        };
    }
}

export default ShowRentalService;