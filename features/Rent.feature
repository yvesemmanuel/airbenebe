GUI Scenario: To rent being logged in, without informing the date and informing a number of guests less or equal to the capacity of the property.
    Given I am logged in with the login "joao123" and the password "1234".
    And I am on the page of the property "Beach House
    And I see the field "date" empty
    And I see the field "guests" empty
    When I fill the field "guests" with "1"
    And the "date" field is still empty
    And I try to rent the property
    Then the property is not rented
    And I see an error message saying "Date or number of guests not entered or invalid"

GUI Scenario: To rent without being logged in, entering a available date and a number of guests less than or equal to the capacity of the property.
    Given I am not logged in
    And I am on the page of the property "Beach House
    And I see the field "date" empty
    And I see the field "guests" empty
    When I fill the field "guests" with "1"
    And I fill the "date" field with "26/02/2022 to 28/02/2022"
    And I try to rent the property
    Then the property is not rented
    And I see an error message saying "You must be logged in to perform a rental"

GUI Scenario: To rent being logged in, entering a available date and a number of guests less than or equal to the property's capacity, but with payment being declined.
    Given I am logged in with the login "john123" and the password "1234".
    And I have filled the field "guests" with "1"
    And I have filled in the field "date" with "26/02/2022 to 28/02/2022"
    And I am on the "Payment" page
    When I try to make the payment with the card number "123"
    Then the property is not rented
    And I see an error message saying "Payment Declined"

GUI Scenario: To rent being logged in, entering a available date and a number of guests less or equal to the capacity of the property, and with payment being approved.
    Given I am logged in with the login "john123" and the password "1234".
    And I have filled the field "guests" with "1"
    And I have filled in the field "date" with "26/02/2022 to 28/02/2022"
    And I am on the "Payment" page
    When I try to make the payment with the card number "1234567887654321"
    Then the property is rented for the period "26/02/2022 to 28/02/2022"
    And I see a confirmation message saying "The rental has been successfully completed"