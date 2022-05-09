import RentalRepository from '../../repositories/RentalRepository';

type ResponseType = {
    error: boolean,
    message: string,
}

class DeleteRentalService {
    public execute(id: string): ResponseType {
        const rentalRepository = new RentalRepository().getInstance();

        const foundRental = rentalRepository.findById(id);

        if (foundRental) {
            rentalRepository.delete(id);

            return {
                error: false,
                message: "Rental deleted.",
            };
        }

        return {
            error: true,
            message: "Rental don't exists.",
        };
    };
};

export default DeleteRentalService;