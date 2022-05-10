describe("Teste de GUI do componente de acomodação", () => {
    beforeEach(() => {
        cy.visit("http://localhost:4200/login");
        
    });

    it("Login bem sucedido", () => {
        // se usa um email valido no banco de dados
        cy.get('[data-cy=email-input]').type('FelipoUlb@gmail.com');
        cy.get('[data-cy=senha-input]').type('222');
        cy.get('[data-cy=submitBtn]').click();
    });

    it("Email não registrado", () => {
        cy.get('[data-cy=email-input]').type('hahaha@gmail.com');
        cy.get('[data-cy=senha-input]').type('123');
        cy.get('[data-cy=submitBtn]').click();
        cy.contains('Nome de usuário ou senha incorretos.');
    });

    it("Senha incorreta", () => {
        cy.get('[data-cy=email-input]').type('FelipoUlb@gmail.com'); //email válido
        cy.get('[data-cy=senha-input]').type('123'); // senha incorreta
        cy.get('[data-cy=submitBtn]').click();
        cy.contains('Nome de usuário ou senha incorretos.');
    });
    

});