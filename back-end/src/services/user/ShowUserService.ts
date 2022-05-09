import User from '../../models/User';
import UserRepository from '../../repositories/UserRepository';

type ResponseType = {
    error: boolean,
    message: string,
    data: User | undefined,
}

class ShowUserService {
    public execute(id: string): ResponseType {
        const userRepository = new UserRepository().getInstance();

        const foundUser = userRepository.findById(id);

        if (foundUser) {
            return {
                error: false,
                message: "User found.",
                data: foundUser,
            };
        }

        return {
            error: true,
            message: "User don't exists.",
            data: undefined,
        };
    }
}

export default ShowUserService;