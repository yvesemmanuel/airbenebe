import AccommodationRepository from '../../../repositories/AccommodationRepository';
import CreateUserService  from '../../user/CreateUserService';

describe("CreateUser", () => {
    const user_sucess = { name: "Yvão da Massa", email: "yefo@cin.ufpe.br", password: "dale", password_confirmation: "dale" };
    const user_failed = { name: "Flipo Ubaldo", email: "flipo@cin.ufpe.br", password: "japao", password_confirmation: "japan" };
    

    it("User created successfully.", async () => {
        const createUser = new CreateUserService();
        const fakeAccommodationRepository = AccommodationRepository;

        const res = createUser.execute({
            name: user_sucess.name,
            email: user_sucess.email,
            password: user_sucess.password,
            password_confirmation: user_sucess.password_confirmation
        });

        expect(res.error == false);
    })

    it("Given email already exists.", async () => {
        const createUser = new CreateUserService();

        const res = createUser.execute({
            name: user_sucess.name,
            email: user_sucess.email,
            password: user_sucess.password,
            password_confirmation: user_sucess.password_confirmation
        });

        expect(res.message === "Given email already exists.");
    })

    it("Confirmation password don't match.", async () => {
        const createUser = new CreateUserService();

        const res = createUser.execute({
            name: user_failed.name,
            email: user_failed.email,
            password: user_failed.password,
            password_confirmation: user_failed.password_confirmation
        });

        expect(res.message === "Confirmation password don't match.");
    })


})