import User from '../../models/User';
import FakeUserRepository from '../../repositories/fakes/FakeUserRepository';
import UserRepository from '../../repositories/UserRepository';

type ResponseType = {
    error: boolean,
    message: string,
    data: User | undefined,
}

class ShowUserService {

    constructor(private userRepository: UserRepository | FakeUserRepository = new UserRepository().getInstance()) {
        this.userRepository = userRepository;
    }

    public execute(id: string): ResponseType {
        const foundUser = this.userRepository.findById(id);

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