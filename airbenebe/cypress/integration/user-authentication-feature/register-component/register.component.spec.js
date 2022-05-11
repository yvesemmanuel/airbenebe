describe("Teste de GUI do componente de cadastro", () => {
    beforeEach(() => {
        cy.clearLocalStorage();
        cy.visit("http://localhost:4200/register");
        
    });

    it("Cadastro bem sucedido", () => {
        cy.get('[input-cy=regEmail]').type('random1232@yahoo.com');
        cy.get('[input-cy=username]').type('Teste');
        cy.get('[input-cy=regPassword]').type('2424');
        cy.get('[input-cy=confirmation]').type('2424');
        cy.get('[button-cy=cadastrar]').click();
        cy.url().should('eq', 'http://localhost:4200/login');
    });

    it("Todas as informações obrigatórias estão sendo exigidas", () => {
        cy.get('[button-cy=cadastrar]').click();
        cy.contains('Por favor, insira seu e-mail!');
        cy.contains('Por favor, insira seu nome!');
        cy.contains('Por favor, insira sua senha!');
        cy.contains('Por favor, confirme sua senha!');
    });

    it("Falha ao cadastrar usuário já cadastrado", () => {
        cy.get('[input-cy=regEmail]').type('FelipoUlb@gmail.com'); // usuário já existente no db
        cy.get('[input-cy=username]').type('Teste'); 
        cy.get('[input-cy=regPassword]').type('2424');
        cy.get('[input-cy=confirmation]').type('2424');
        cy.get('[button-cy=cadastrar]').click();
        cy.contains('Já existe um usuário com esse e-mail.');
    });

    it("Falha ao criar conta com senha diferente no campo de confirmação", () => {
        cy.get('[input-cy=regEmail]').type('random12322@yahoo.com');
        cy.get('[input-cy=username]').type('Teste'); 
        cy.get('[input-cy=regPassword]').type('2424');
        cy.get('[input-cy=confirmation]').type('2322'); //senhas diferentes
        cy.get('[button-cy=cadastrar]').click();
        cy.contains('As senhas não são iguais.');
    });

});