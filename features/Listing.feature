Scenario: successful listing created
	Given I'm on the "add listing" page
	And I set the home type to "Apartment"
	And I set the listing's state to "Paraíba"
    And I set the listing's city to "João Pessoa"
    And I set the number of guests allowed to "5"
    And I set the number of rooms to "3"
    And I set the number of restrooms to "3"
	And I fill the address with "Avenida Sapé"
	And I fill the street number with "175"
	And I fill the ZIP Code with "58038-380"
	And I upload the property's pictures
	And I fill the description space with "Um ótimo apartamento com uma belíssima visão para a praia. A moradia conta com piscina e área de lazer, tudo disponível para o cliente. Venha aproveitar a beleza de João Pessoa!"
	And I set the pricing to "200 R$/day"
	When I press "confirm"
	Then I see a confirmation window with all information filled out
	And I confirm again
	Then I'm redirected to the host's page
	And I see a "successful listing" message


Scenario: unsuccessful listing
    Given I'm on the "add listing" page
	When I leave at least 1 mandatory blank space unfulfilled
    Then I can't confirm the registration until I fill out all mandatory blank spaces 


Scenario: making an ad unavailable
	Given I'm on the host's page
	And I see all my listings
	When I select my house's listing
	And I see a "make unavailable" icon
	When I click on this icon
	Then I see a confirmation window 
	When I confirm my selection
	Then the listing is unavailable to other potential clients. They can still see the ad, but it's booking is unavailable.



Scenario: deleting an ad
    Given I'm on the host's page
	And I see all my listings
	When I select my house's listing
	Then I see a delete icon
	And I click on this icon
	Then I see a confirmation window
	When I confirm my selection
	Then I can't see my listing anymore and it's also deleted from the Data Bank.

Scenario: failing to delete a listing
    Given I'm on the host's page
	And I see all my listings
	When I select my house's listing
	Then I see a delete icon
	And I click on this icon
    Then I see a warning which says "Please end all ongoing negotiations before deleting"

Scenario: failing to making an ad unavailable
    Given I'm on the host's page
	And I see all my listings
	When I select my house's listing
	Then I see a "make unavailable" icon
	And I click on this icon
    Then I see a warning which says "Please end all ongoing negotiations before making your listing unavailable"
    Then lorem ipsum dolor