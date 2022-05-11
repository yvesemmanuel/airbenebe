import User from "../../models/User";
import FakeUserRepository from "../../repositories/fakes/FakeUserRepository";
import UserRepository from "../../repositories/UserRepository";

type ResponseType = {
    error: boolean,
    message: string,
    data: User | undefined,
}

type RequestType = {
    id: string,
    newPassword: string,
}

class UpdateUserService {

    constructor(private userRepository: UserRepository | FakeUserRepository = new UserRepository().getInstance()) {
        this.userRepository = userRepository;
    }

    public execute({ id, newPassword }: RequestType): ResponseType {
        const foundUser = this.userRepository.findById(id);

        if (!foundUser) {
            return {
                error: true,
                message: "User doesn't exists.",
                data: undefined,
            }
        }

        const updatedUser = this.userRepository.update(id, newPassword);

        return {
            error: false,
            message: "User's password updated successfully.",
            data: updatedUser,
        };
    };
};

export default UpdateUserService;
