import FakeUserRepository from '../../../repositories/fakes/FakeUserRepository';
import LoginService  from '../../user/LoginService';
import CreateUserService from '../../user/CreateUserService';

describe("LoginUser", () => {
    const userSuccess = { email: "FelipoUlb@gmail.com", password: "222"};
    
    const userFail = { email: "fipo@cin.ufpe.br", password: "222"};

    const credentialFail = { email: "FelipoUlb@gmail.com", password: "japao"};
    
    it("User don't exists.", async () => {
        const fakeUserRepository = new FakeUserRepository();
        const LoginUser = new LoginService(fakeUserRepository);

        const res = LoginUser.execute({
            email: userFail.email,
            password: userFail.password
        }); 

        expect(res.error).toBeTruthy();
        expect(res.message).toEqual("User don't exists.");
    })

    it("User credentials are incorrect.", async () => {
        const fakeUserRepository = new FakeUserRepository();
        const createUser = new CreateUserService(fakeUserRepository);
        const LoginUser = new LoginService(fakeUserRepository);

        createUser.execute({
            name: "Felipo",
            email: credentialFail.email,
            password: credentialFail.password,
            password_confirmation: credentialFail.password
        });

        const res = LoginUser.execute({
            email: credentialFail.email,
            password: "8888888"
        });

        expect(res.error).toBeTruthy();
        expect(res.message).toEqual("User credentials are incorrect.");
    })

    it("User sucessfully Login.", async () => {
        const fakeUserRepository = new FakeUserRepository();
        const createUser = new CreateUserService(fakeUserRepository);
        const LoginUser = new LoginService(fakeUserRepository);

        createUser.execute({
            name: "José",
            email: userSuccess.email,
            password: userSuccess.password,
            password_confirmation: userSuccess.password
        });

        const res = LoginUser.execute({
            email: userSuccess .email,
            password: userSuccess .password
        });

        expect(res.error).toBeFalsy();
    })
})