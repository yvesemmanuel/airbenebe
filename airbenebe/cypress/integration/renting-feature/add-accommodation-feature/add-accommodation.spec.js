function fillType() {
    cy.get("[input-cy=type]").click();
    cy.contains("Casa").click();
    cy.get("[button-cy=next1]").click();
}

function fillAdress() {
    fillType();
    cy.get("[input-cy=street]").type("Rua Nova Aparecida");
    cy.get("[input-cy=number]").type(111);
    cy.get("[input-cy=city]").type("São Francisco de Paula");
    cy.get("[input-cy=state]").click();
    cy.contains("Rio Grande do Sul").click();
    cy.get("[input-cy=cep]").type("90000-000");
    cy.get("[button-cy=next2]").click();
}

function fillCharacteristics() {
    fillAdress();
    cy.get("[input-cy=guests]").type(6);
    cy.get("[input-cy=rooms]").type(3);
    cy.get("[input-cy=bathrooms]").type(4);
    cy.get("[button-cy=next3]").click();
}

function fillImages() {
    fillCharacteristics();
    cy.get("[input-cy=images]").selectFile("cypress/fixtures/foto1.png");
    cy.get("[button-cy=next4]").click();
}

function fillFinal() {
    fillImages();
    cy.get("[input-cy=price]").type(433);
    cy.get("[input-cy=title]").type("Casa muito massa no campo");
    cy.get("[input-cy=description]").type("Essa casa é top, pode confiar, irmão.");
}

describe("Teste de GUI do componente de acomodação", () => {

    beforeEach(() => {
        cy.clearLocalStorage();
        cy.visit("/login");
        cy.url().should('eq', 'http://localhost:4200/login');
        cy.get("[input-cy=email]").type("FelipoUlb@gmail.com");
        cy.get("[input-cy=password]").type("222");
        cy.get("[button-cy=logar]").click();
        cy.wait(2000);
        cy.visit("add-accommodation");
    });

    it("Não deve conseguir acessar os campos de localização sem escolher o tipo da acomodação", () => {
        cy.get("[button-cy=next1]").click();
        cy.get("[button-cy=next2]").should("not.be.visible");
    });

    it("Não deve conseguir acessar os campos de características sem preencher os campos de localização", () => {
        fillType();
        cy.get("[button-cy=next2]").click();
        cy.get("[button-cy=next3]").should("not.be.visible");
    });

    it("Não deve conseguir acessar o campo de imagens sem preencher os campos de características", () => {
        fillAdress();
        cy.get("[button-cy=next3]").click();
        cy.get("[button-cy=next4]").should("not.be.visible");
    });

    it("Não deve conseguir acessar os campos finais sem preencher o campo de imagens", () => {
        fillCharacteristics();
        cy.get("[button-cy=next4]").click();
        cy.get("[button-cy=finish").should("not.be.visible");
    });

    it("Não deve conseguir finalizar o cadastro em preencher os campos finais", () => {
        fillImages();
        cy.get("[button-cy=finish]").click();
        cy.url().should('eq', 'http://localhost:4200/add-accommodation')
    });

    it("Deve conseguir finalizar o cadastro ao preencher todos os campos corretamente", () => {
        fillFinal();
        cy.get("[button-cy=finish]").click();
        cy.wait(2000);
        cy.url().should("eq", "http://localhost:4200/myaccommodations")
        cy.contains("Casa muito massa no campo")
    });
});