import Rental from "../../models/Rental";
import RentalRepository from "../../repositories/RentalRepository";

type ResponseType = {
    error: boolean,
    message: string,
    data: Rental | undefined,
}

type RequestType = {
    id: string,
    newStart: string,
    newEnd: string
}

class UpdateRentalService {
    public execute({ id, newStart, newEnd }: RequestType): ResponseType {
        const rentalRepository = new RentalRepository().getInstance()

        const foundRental = rentalRepository.findById(id);

        if (!foundRental) {
            return {
                error: true,
                message: "Rental doesn't exists.",
                data: undefined,
            }
        }

        const updatedRental = rentalRepository.updateDates(id, newStart, newEnd);

        return {
            error: false,
            message: "Rentals dates updated successfully.",
            data: updatedRental,
        };
    };
};

export default UpdateRentalService;
