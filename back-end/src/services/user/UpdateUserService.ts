import User from "../../models/User";
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
    public execute({ id, newPassword }: RequestType): ResponseType {
        const userRepository = new UserRepository().getInstance()

        const foundUser = userRepository.findById(id);

        if (!foundUser) {
            return {
                error: true,
                message: "User doesn't exists.",
                data: undefined,
            }
        }

        const updatedUser = userRepository.update(id, newPassword);

        return {
            error: false,
            message: "User's password updated successfully.",
            data: updatedUser,
        };
    };
};

export default UpdateUserService;
