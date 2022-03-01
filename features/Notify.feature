Feature: Notificar ao cliente das datas do aluguel.

 Scenario: Contest Dates
   Given I am at the “Aluguéis” page
   And I want to check the dates of my rent 
   When I click on which specific rent i want to verify
   Then I click on the “Contestar” button
   And Enter in contact through Email with the “owner/real estate broker” to resolve the situation.
 
Scenario: Change Dates
   Given I am at the “Pagina Inicial” page
   And I want to change the dates of my rent 
   When I click the “Aluguel” button
   Then I go to the “Aluguéis” page
   And I click on which specific rent i want to verify
   Then I click on the “Alterar Datas” button
   And Enter in contact through Email with the “owner/real estate broker” to resolve the situation.

Scenario: Cancel Dates
   Given I am at the “Aluguéis” page
   And I want to cancel of my rent 
   When I click on which specific rent i want to cancel
   Then I click on the “Cancelar” button
   And Enter in contact through Email with the “owner/real estate broker” to explain the cancellation.

