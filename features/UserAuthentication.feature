Feature: User Authentication
	As a registered member in the system
	I want to have access to all its internal features, which are only accessible after a successful login authentication

# negatives scenarios

Scenario: Unsuccessful login (non-existing user account)
	Given I am at the Login page
	When I try to login with email “yefo@cin.ufpe.br” and password “n0tk1dd1ng”
	Then I am redirected to the Login page
	And I see an error message (email not registered in the database)

Scenario: Unsuccessful login (wrong password account)
	Given I am at the Login page
	When I try to login with email “yefo@cin.ufpe.br” and password “notkidding”
	Then I am redirected to the Login page
	And I see an error message (email registered in the database associated with another password)

Scenario: Unsuccessful new user register (invalid email account)
	Given I am at the User Register page
	When I try to create a new user with email “yefo@ufpe.cin.br” and password "n0tk1dd1ng"
	And I select that I accept the terms of service (checkbox)
	Then I see an error message (email not properly formatted/doesn't exist)
	
Scenario: Unsuccessful new user register (weak password)
	Given I am at the User Register page
	When I try to create a new user with email “yefo@ufpe.cin.br” and password "12#45"
	And I select that I accept the terms of service (checkbox)
	Then I see an error message (try an alphanumerical password)
	
Scenario: Unsuccessful new user register (terms of service not accepted)
	Given I am at the User Register page
	When I try to create a new user with email “yefo@ufpe.cin.br” and password "n0tk1dd1ng"
	And I don't select that I accept the terms of service (checkbox)
	Then I see an error message (try an alphanumerical password)

# positive scenarios

Scenario: Successful user login
	Given I am at the landing page
	When I try to login with email “yefo@cin.ufpe.br” and password “n0tk1dding”
	Then I am redirected to the Main page

Scenario: Successful new user register
	Given I am at the landing page
	When I try to create a new user with email “yefo@cin.ufpe.br” and password “n0tkidd1ng” 
	And I select that I accept the terms of service (checkbox)
	Then I am redirected to the Main page
