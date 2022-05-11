describe("Teste de GUI da listagem de anuncios", () => {
    beforeEach(() => {
        cy.clearLocalStorage();
        cy.visit("/login");
        cy.url().should('eq', 'http://localhost:4200/login');
        cy.get("[input-cy=email]").type("FelipoUlb@gmail.com");
        cy.get("[input-cy=password]").type("222");
        cy.get("[button-cy=logar]").click();
        cy.wait(2000);
        cy.visit("listing");
    });

    it("O filtro por cidade está funcionando", () => {
        cy.get("[input-cy=searchIn]").type('João Pessoa');
        cy.get("[button-cy=searchLoc]").click();
        cy.contains("Foram listadas 1 acomodação");
        cy.contains("Apartamento em João Pessoa");
    });

    it("O botão limpar está funcionando", () => {
        cy.get("[input-cy=searchIn]").type('João Pessoa');
        cy.get("[button-cy=searchLoc]").click();
        cy.contains("Foram listadas 1 acomodação");
        cy.contains("Apartamento em João Pessoa");
        cy.get("[button-cy=clearSearch]").click();
        cy.contains("Foram listadas 5 acomodações");
    });

    it("Os links do anuncio estão funcionando", () => {
        cy.contains("Casa na Praia maior de todas | Rua Ondina 214 - Recife").click();
        cy.contains("Casa na Praia maior de todas");
        cy.visit("/listing");
        cy.contains("Apartamento ruim | Rua testando um dois 44 - João Pessoa").click();
        cy.contains("Apartamento ruim");
    });
    

});