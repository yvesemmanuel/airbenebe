import LoginService  from '../../user/LoginService';

describe("LoginUser", () => {
    const userSuccess = { email: "FelipoUlb@gmail.com", password: "222"};
    
    const userFail = { email: "fipo@cin.ufpe.br", password: "222"};

    const credentialSuccess = { email: "FelipoUlb@gmail.com", password: "japao"};
    

    it("User don't exists.", async () => {
        const LoginUser = new LoginService();

        const res = LoginUser.execute({
            email: userFail.email,
            password: userFail.password
        }); 

        expect(res.error).toBeTruthy();
        expect(res.message).toEqual("User don't exists.");
    })

    it("User credentials are incorrect.", async () => {
        const LoginUser = new LoginService();

        const res = LoginUser.execute({
            email: credentialSuccess.email,
            password: credentialSuccess.password
        });

        expect(res.error).toBeTruthy();
        expect(res.message).toEqual("User credentials are incorrect.");
    })

    it("User sucessfully Login.", async () => {
        const LoginUser = new LoginService();

        const res = LoginUser.execute({
            email: userSuccess.email,
            password: userSuccess.password
        });

        expect(res.error).toBeFalsy();
    })
})