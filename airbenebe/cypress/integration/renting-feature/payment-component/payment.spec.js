describe("Teste de GUI do componente de pagamento", () => {
    beforeEach(() => {
        cy.visit("accommodation/1");
        cy.get("[button-cy=calendar-toggle]").click();
        cy.contains('25').click();
        cy.contains('27').click();
        cy.get("[data-cy=total]").should("be.visible");
        cy.get("[button-cy=renting]").click();
    });

    it("Deve gerar mensagens de erro submeter com campos vazios", () => {
        cy.get("[button-cy=payment]").click();
        cy.get("[error-cy=null-method]").should("be.visible");
        cy.get("[error-cy=null-number]").should("be.visible");
        cy.get("[error-cy=null-name]").should("be.visible");
        cy.get("[error-cy=null-expiry]").should("be.visible");
        cy.get("[error-cy=null-cvv]").should("be.visible");
    });

    it("Deve gerar mensagens de erro ao inserir dados inválidos nos campos", () => {
        cy.get("[input-cy=method]").click();
        cy.contains("Cartão de crédito").click();
        cy.get("[input-cy=number]").type("123456789");
        cy.get("[input-cy=name]").type("123456789 $5¨@#41");
        cy.get("[input-cy=expiry]").type("4524");
        cy.get("[input-cy=cvv]").type("2");
        cy.get("[button-cy=payment]").click();
        cy.get("[error-cy=invalid-number]").should("be.visible");
        cy.get("[error-cy=invalid-name]").should("be.visible");
        cy.get("[error-cy=invalid-expiry]").should("be.visible");
        cy.get("[error-cy=invalid-cvv]").should("be.visible");
    });

    it("Ao preencher os campos com dados válidos, o aluguel deve se encontrar na lista do usuário", () => {
        cy.get("[input-cy=method]").click();
        cy.contains("Cartão de crédito").click();
        cy.get("[input-cy=number]").type("1111111111111111");
        cy.get("[input-cy=name]").type("Joao Pedro");
        cy.get("[input-cy=expiry]").type("0824");
        cy.get("[input-cy=cvv]").type("456");
    });
});