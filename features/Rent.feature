GUI Scenario: To rent being logged in, without entering the date and entering a number of guests less or equal to the capacity of the property
    Given I am logged in with the login "joao123" and the password "1234"
    And I am on the page of the property "Beach House"
    And I see the field "date" empty
    And I see the field "guests" empty
    When I fill the field "guests" with "1"
    And the "date" field is still empty
    And I try to rent the property
    Then the property is not rented
    And I see an error message saying "Date or number of guests not entered or invalid"

GUI Scenario: To rent without being logged in, entering a available date and a number of guests less than or equal to the capacity of the property
    Given I am not logged in
    And I am on the page of the property "Beach House"
    And I see the field "date" empty
    And I see the field "guests" empty
    When I fill the field "guests" with "1"
    And I fill the "date" field with "26/02/2022 to 28/02/2022"
    And I try to rent the property
    Then the property is not rented
    And I see an error message saying "You must be logged in to rent a property"

GUI Scenario: To rent being logged in, entering a available date and a number of guests less than or equal to the property's capacity, but with payment being declined
    Given I am logged in with the login "john123" and the password "1234"
    And I have filled the field "guests" with "1"
    And I have filled in the field "date" with "26/02/2022 to 28/02/2022"
    And I am on the "Payment" page
    When I try to make the payment with the card number "123"
    Then the property is not rented
    And I see an error message saying "Payment Declined"

GUI Scenario: To rent being logged in, entering a available date and a number of guests less or equal to the capacity of the property, and with payment being approved
    Given I am logged in with the login "john123" and the password "1234"
    And I have filled the field "guests" with "1"
    And I have filled in the field "date" with "26/02/2022 to 28/02/2022"
    And I am on the "Payment" page
    When I try to make the payment with the card number "1234567887654321"
    Then the property is rented for the period "26/02/2022 to 28/02/2022"
    And I see a confirmation message saying "The rental has been successfully completed"

GUI Scenario: To rent being logged in, entering a available date and without entering a number of guests
    Given I am logged in with the login "joao123" and the password "1234"
    And I am on the page of the property "Beach House"
    And I see the field "date" empty
    And I see the field "guests" empty
    When I fill the "date" field with "26/02/2022 to 28/02/2022"
    And the "guests" field is still empty
    And I try to rent the property
    Then the property is not rented
    And I see an error message saying "Date or number of guests not entered or invalid"

GUI Scenario: To rent being logged in, entering a available date and a number of guests greater than the property's capacity.
    Given I am logged in with the login "joao123" and the password "1234".
    And I am on the page of the property "Beach House", with has a capacity of 3 guests.
    And I see the field "date" empty
    And I see the field "guests" empty
    When I fill the "date" field with "26/02/2022 to 28/02/2022"
    And I fill the field "guests" with "4"
    And I try to rent the property
    Then the property is not rented
    And I see an error message saying "Date or number of guests not entered or invalid"
    Then teste

Service Scenario: Tp rent a property by entering valid number of guests and date
    Given I access the system as "john123"
    And in the system it does not appear that "john123" rented the property "Beach House"
    When I try to rent the property "Beach House" with date "26/02/2022 to 28/02/2022" and with guests "1"
    Then the system returns a rental confirmation message
    And it is stored in the system that the user "john123" rented the property "Beach House" with date "02/26/2022 to 02/28/2022" and with guests "1"

Service Scenario: Renting a property without informing the date
    Given I access the system as "john123"
    And in the system it does not appear that "john123" rented the property "Beach House"
    When I try to rent the property "Beach House" with guests "1", but without date
    Then the system returns an error message about the absence of date
    And in the system it does not appear that "john123" rented the property "Beach House"
