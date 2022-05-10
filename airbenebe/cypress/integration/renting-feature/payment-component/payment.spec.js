describe("Teste de GUI do componente de pagamento", () => {
    beforeEach(() => {
        cy.clearLocalStorage();
        cy.visit("/login");
        cy.url().should('eq', 'http://localhost:4200/login');
        cy.get("[input-cy=email]").type("joaopedro@gmail.com");
        cy.get("[input-cy=password]").type("111");
        cy.get("[button-cy=logar]").click();
        cy.wait(2000);
    });

    beforeEach(() => {
        cy.visit("accommodation/200e37d4-2feb-4dfa-aa09-892017d595b6");
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
        cy.get("[button-cy=payment]").click();
        cy.wait(2000);
        cy.contains("Apartamento à beira da praia de Copacabana")
        cy.get("[button-cy=cancel]").last().click();
        cy.get("[button-cy=confirm]").click();
    });
});