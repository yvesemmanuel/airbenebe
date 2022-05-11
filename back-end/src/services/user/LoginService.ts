import User from '../../models/User';
import FakeUserRepository from '../../repositories/fakes/FakeUserRepository';
import UserRepository from '../../repositories/UserRepository';

type LoginType = {
    email: string,
    password: string,
}

type ResponseType = {
    error: boolean,
    message: string,
    data: User | undefined,
}

class LoginService {

    constructor(private userRepository: UserRepository | FakeUserRepository = new UserRepository().getInstance()) {
        this.userRepository = userRepository;
    }

    public execute({ email, password }: LoginType): ResponseType {
        const foundUser = this.userRepository.findByEmail(email);

        if (!foundUser) {
            return {
                error: true,
                message: "User don't exists.",
                data: undefined,
            };
        }

        const matchCredentials = this.userRepository.login(email, password);

        if (matchCredentials) {
            return {
                error: false,
                message: "User login sucessfully.",
                data: foundUser,
            };
        };

        return {
            error: true,
            message: "User credentials are incorrect.",
            data: undefined,
        };
    }
}

export default LoginService;