describe("Testes da janela de notificação", () => {
    beforeEach(() => {
        cy.clearLocalStorage();
        cy.visit("/login");
        cy.url().should('eq', 'http://localhost:4200/login');
        cy.get("[input-cy=email]").type("FelipoUlb@gmail.com");
        cy.get("[input-cy=password]").type("222");
        cy.get("[button-cy=logar]").click();
    });

    it("Entra corretamente na janela de notificação", () => {
        cy.get("[button-cy=menu]").click();
        cy.get("[button-cy=notifications]").click();
        cy.contains('Minhas notificações');
    });
 
});