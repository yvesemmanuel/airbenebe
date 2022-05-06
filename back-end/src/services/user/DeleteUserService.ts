import UserRepository from '../../repositories/UserRepository';

type ResponseType = {
    error: boolean,
    message: string,
}

class DeleteUserService {
    public execute(id: string): ResponseType {
        const userRepository = new UserRepository().getInstance();

        const foundUser = userRepository.findById(id);

        if (foundUser) {
            userRepository.delete(id);

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