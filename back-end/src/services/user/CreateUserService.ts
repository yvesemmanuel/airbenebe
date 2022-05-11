import User from '../../models/User';
import FakeUserRepository from '../../repositories/fakes/FakeUserRepository';
import UserRepository from '../../repositories/UserRepository';

type CreateUserType = {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
};

type ResponseType = {
    error: boolean,
    message: string,
    data: User | undefined,
}

class CreateUserService {

    constructor(private userRepository: UserRepository | FakeUserRepository = new UserRepository().getInstance()) {
        this.userRepository = userRepository;
    }

    public execute({
        name,
        email,
        password,
        password_confirmation
    }: CreateUserType): ResponseType {

        const foundUser = this.userRepository.findByEmail(email);
        
        if (password !== password_confirmation) {
            return {
                error: true,
                message: "Confirmation password don't match.",
                data: undefined,
            }
        }

        if (foundUser) {
            return {
                error: true,
                message: "Given email already exists.",
                data: undefined,
            }
        }

        const user = this.userRepository.create({
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