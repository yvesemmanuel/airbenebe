import FakeUserRepository from '../../repositories/fakes/FakeUserRepository';
import UserRepository from '../../repositories/UserRepository';

type ResponseType = {
    error: boolean,
    message: string,
}

class DeleteUserService {

    constructor(private userRepository: UserRepository | FakeUserRepository = new UserRepository().getInstance()) {
        this.userRepository = userRepository;
    }

    public execute(id: string): ResponseType {
        const foundUser = this.userRepository.findById(id);

        if (foundUser) {
            this.userRepository.delete(id);

            return {
                error: false,
                message: "User deleted.",
            };
        }

        return {
            error: true,
            message: "User don't exists.",
        };
    };
};

export default DeleteUserService;