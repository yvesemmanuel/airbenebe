import FakeUserRepository from '../../../repositories/fakes/FakeUserRepository';
import CreateUserService  from '../../user/CreateUserService';

describe("CreateUser", () => {
    const userSuccess = { name: "Yvão da Massa", email: "yefo@cin.ufpe.br", password: "dale", password_confirmation: "dale" };
    const userFail = { name: "Flipo Ubaldo", email: "flipo@cin.ufpe.br", password: "japao", password_confirmation: "japan" };
    

    it("User created successfully.", async () => {
        const fakeUserRepository = new FakeUserRepository();
        const createUser = new CreateUserService(fakeUserRepository);

        const res = createUser.execute({
            name: userSuccess.name,
            email: userSuccess.email,
            password: userSuccess.password,
            password_confirmation: userSuccess.password_confirmation
        });

        expect(res.error).toBeFalsy();
    })

    it("Given email already exists.", async () => {
        const fakeUserRepository = new FakeUserRepository();
        const createUser = new CreateUserService(fakeUserRepository);

        createUser.execute({
            name: userSuccess.name,
            email: userSuccess.email,
            password: userSuccess.password,
            password_confirmation: userSuccess.password_confirmation
        });
        
        const res = createUser.execute({
            name: userSuccess.name,
            email: userSuccess.email,
            password: userSuccess.password,
            password_confirmation: userSuccess.password_confirmation
        });

        expect(res.error).toBeTruthy();
        expect(res.message).toEqual("Given email already exists.");
    })

    it("Confirmation password don't match.", async () => {
        const fakeUserRepository = new FakeUserRepository();
        const createUser = new CreateUserService(fakeUserRepository);

        const res = createUser.execute({
            name: userFail.name,
            email: userFail.email,
            password: userFail.password,
            password_confirmation: userFail.password_confirmation
        });

        expect(res.error).toBeTruthy();
        expect(res.message).toEqual("Confirmation password don't match.");
    })


})