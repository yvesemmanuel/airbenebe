Feature: Notificar ao cliente das datas do aluguel

Scenario: Contest Dates
   Given I am at the “Aluguéis” page
   And I want to check the dates of my rent 
   When I click on which specific rent i want to verify
   Then I click on the “Contestar” button
   And Enter in contact through Email with the “owner/real estate broker” to resolve the situation.
 
Scenario: Change Dates
   Given I am at the “Aluguéis” page
   And I want to change the dates of my rent 
   When I click on which specific rent i want to verify
   And Fill the form about the reason to change
   Then I click on the “Alterar Datas” button
   And Enter in contact through Email with the “owner/real estate broker” to resolve the situation.

Scenario: Cancel Dates
   Given I am at the “Aluguéis” page
   And I want to cancel of my rent 
   When I click on which specific rent i want to cancel
   And Fill the form about the reason to cancel
   Then I click on the “Cancelar” button
   And Enter in contact through Email with the “owner/real estate broker” to explain the cancellation.

#Cenários de Falhas

Scenario: Change Dates fail
   Given I am at the “Aluguéis” page
   And I want to change the dates of my rent 
   When I click on which specific rent i want to verify
   And I dont Fill the form about the reason to change
   Then I click on the “Alterar Datas” button
   And I see the error message "Erro ao preencher o formulário de alteração de datas, tentar novamente"

Scenario: Cancel Dates fail
   Given I am at the “Aluguéis” page
   And I want to cancel of my rent 
   When I click on which specific rent i want to cancel
   And I dont Fill the form about the reason to cancel
   Then I click on the “Cancelar” button
   And I see the error message "Erro ao preencher o formulário de cancelamento do aluguel, tentar novamente"

Scenario: Questão 7-b
   Given I am at 7-a 
   When I am at 7-b
   Then I am at 7-c

Scenario: Questão 7-f
   Given I am at 7-a 
   When I am at 7-b
   Then I am at 7-c