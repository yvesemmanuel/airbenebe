import User from '../../models/User';
import UserRepository from '../../repositories/UserRepository';

type CreateUserType = {
    name: string;
    email: string;
    password: string;
};

type ResponseType = {
    error: boolean,
    message: string,
    data: User | undefined,
}

class CreateUserService {
    public execute({
        name,
        email,
        password,
    }: CreateUserType): ResponseType {
        const userRepository = new UserRepository().getInstance()

        const foundUser = userRepository.findByEmail(email);

        if (foundUser) {
            return {
                error: true,
                message: "Given email already exists.",
                data: undefined,
            }
        }

        const user = userRepository.create({
            name,
            email,
            password,
        });

        return {
            error: false,
            message: "User created successfully.",
            data: user,
        };
    };
};

export default CreateUserService;