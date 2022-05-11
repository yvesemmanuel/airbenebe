describe("Teste de GUI da listagem de reservas", () => {
    beforeEach(() => {
        cy.clearLocalStorage();
        cy.visit("/login");
        cy.url().should('eq', 'http://localhost:4200/login');
        cy.get("[input-cy=email]").type("FelipoUlb@gmail.com");
        cy.get("[input-cy=password]").type("222");
        cy.get("[button-cy=logar]").click();
        cy.wait(2000);
        cy.visit("myrentals");
    });

    it("Alterando datas de reservas", () => {
        cy.contains("Editar data").click();
        cy.get("[button-cy=calendar-toggle]").click();
        cy.contains('23').click();
        cy.contains('25').click();
        cy.contains('Confirmar').click();
        cy.contains('De: 23/05/2022').click();
        cy.contains('Até: 25/05/2022').click();
        cy.contains('Noites: 2').click();
    });

    it("Cancelando reservas", () => {
        cy.contains("Cancelar Reserva").click();
        cy.get("[button-cy=confirm]").click();
        cy.wait(2000);
        cy.contains("Cancelar Reserva").click();
        cy.get("[button-cy=confirm]").click();
        cy.contains('Casa na Praia maior de todas').should('not.exist')
    });



});