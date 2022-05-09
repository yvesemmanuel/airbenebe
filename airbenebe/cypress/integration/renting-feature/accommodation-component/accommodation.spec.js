describe("Teste de GUI do componente de acomodação", () => {
    beforeEach(() => {
        cy.visit("accommodation/1");
    });

    it("Deve gerar uma mensagem de erro ao tentar submeter uma data vazia", () => {
        cy.get("[data-cy=total]").should("not.exist");
        cy.get("[button-cy=renting]").click();
        cy.get("[error-cy=invalid-date]").should("be.visible").contains("O período deve ser selecionado.");
    });

    it("Deve gerar uma mensagem de erro ao tentar submeter datas iguais", () => {
        cy.get("[button-cy=calendar-toggle]").click();
        cy.contains('25').dblclick();
        cy.get("[data-cy=total]").should("not.exist");
        cy.get("[button-cy=renting]").click();
        cy.get("[error-cy=invalid-date]").should("be.visible").contains("As datas devem ser diferentes.");
    });

    it("Não deve ser possível inserir número de hóspedes menor que 1 ou maior que a capacidade da acomodação", () => {
        cy.get("[button-cy=minus-guests]").should("be.disabled");
        cy.get("[button-cy=plus-guests]").dblclick();
        cy.get("[button-cy=plus-guests]").should("be.disabled");
    });

    it("Ao inserir uma data válida e submeter, deve ser redirecionado a página de pagamento", () => {
        cy.get("[button-cy=calendar-toggle]").click();
        cy.contains('25').click();
        cy.contains('27').click();
        cy.get("[data-cy=total]").should("be.visible");
        cy.get("[button-cy=renting]").click();
        cy.url().should('eq', 'http://localhost:4200/accommodation/1/payment?guests=1&start=2022-05-25T03:00:00.000Z&end=2022-05-27T03:00:00.000Z')
    });
});