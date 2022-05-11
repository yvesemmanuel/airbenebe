import LoginService  from '../../user/LoginService';

describe("LoginUser", () => {
    const user_sucess = { email: "FelipoUlb@gmail.com", password: "222"};
    
    const user_failed = { email: "fipo@cin.ufpe.br", password: "222"};

    const user_failed1 = { email: "FelipoUlb@gmail.com", password: "japao"};
    

    it("User don't exists.", async () => {
        const LoginUser = new LoginService();

        const res = LoginUser.execute({
            email: user_failed.email,
            password: user_failed.password
        }); 

        expect(res.message === "User don't exists.");
    })

    it("User sucessfully Login.", async () => {
        const LoginUser = new LoginService();

        const res = LoginUser.execute({
            email: user_sucess.email,
            password: user_sucess.password
        });

        expect(res.error === false);
    })

    it("User credentials are incorrect.", async () => {
        const LoginUser = new LoginService();

        const res = LoginUser.execute({
            email: user_failed1.email,
            password: user_failed1.password
        });

        expect(res.message === "User credentials are incorrect.");
    })
})