describe("Teste de GUI do componente de acomodação", () => {
    beforeEach(() => {
        cy.visit("http://localhost:4200/");
        
    });

    it("Retorna true se o título do texto está certo", () => {
        cy.contains("Encontre aqui um lar para chamar de seu!");
    });

    it("Entrando na tela de login", () => {
        cy.get("[data-cy=loginBtn]").click();
        cy.contains("Login");
    });

});