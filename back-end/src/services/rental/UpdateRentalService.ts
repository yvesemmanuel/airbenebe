import Rental from "../../models/Rental";
import FakeRentalRepository from "../../repositories/fakes/FakeRentalRepository";
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

    constructor(private rentalRepository: RentalRepository | FakeRentalRepository = new RentalRepository().getInstance()) {
        this.rentalRepository = rentalRepository;
    }

    public execute({ id, newStart, newEnd }: RequestType): ResponseType {
        const foundRental = this.rentalRepository.findById(id);

        if (!foundRental) {
            return {
                error: true,
                message: "Rental doesn't exists.",
                data: undefined,
            }
        }

        const updatedRental = this.rentalRepository.updateDates(id, newStart, newEnd);

        return {
            error: false,
            message: "Rentals dates updated successfully.",
            data: updatedRental,
        };
    };
};

export default UpdateRentalService;
