import User from '../../models/User';
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
    public execute({ email, password }: LoginType): ResponseType {
        const userRepository = new UserRepository().getInstance();

        const foundUser = userRepository.findByEmail(email);

        if (!foundUser) {
            return {
                error: true,
                message: "User don't exists.",
                data: undefined,
            };
        }

        const matchCredentials = userRepository.login(email, password);

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