describe("Teste de GUI do componente de login", () => {
    beforeEach(() => {
        cy.visit("http://localhost:4200/login");
        
    });

    it("Login bem sucedido", () => {
        // se usa um email valido no banco de dados
        cy.get('[input-cy=email]').type('FelipoUlb@gmail.com');
        cy.get('[input-cy=password]').type('222');
        cy.get('[button-cy=logar]').click();
        cy.url().should('eq', 'http://localhost:4200/listing');
    });

    it("Email não registrado", () => {
        cy.get('[input-cy=email]').type('hahaha@gmail.com');
        cy.get('[input-cy=password]').type('123');
        cy.get('[button-cy=logar]').click();
        cy.contains('Nome de usuário ou senha incorretos.');
    });

    it("Senha incorreta", () => {
        cy.get('[input-cy=email]').type('FelipoUlb@gmail.com'); //email válido
        cy.get('[input-cy=password]').type('123'); // senha incorreta
        cy.get('[button-cy=logar]').click();
        cy.contains('Nome de usuário ou senha incorretos.');
    });

    it("Clicando no botão de entrar sem dados", () => {
        cy.get('[button-cy=logar]').click();
        cy.contains('Por favor, insira seu e-mail!');
        cy.contains('Por favor, insira sua senha!');
    });  

    it("Botão não possui conta está redirecionando corretamente para registrar", () => {
        cy.get('[button-cy=notRegistered]').click();
        cy.url().should('eq', 'http://localhost:4200/register');
    }); 
});