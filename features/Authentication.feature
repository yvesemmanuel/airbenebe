Feature: User Authentication
	As a registered member in the system
	I want to have access to all its internal features, which are only accessible after a successful login authentication.

Scenario: Login with non-existing user account
	Given I am at the Login page
	When I try to login with email “yefo@cin.ufpe.br” and password “notkidding”
	Then I am redirected to the Login page
	And I see an error message (“non-existing user account”)

Scenario: Login with wrong password account
	Given I am at the Login page
	When I try to login with email “yefo@cin.ufpe.br” and password “notkiddiiing”
	Then I am redirected to the Login page
	And I see an error message (“wrong password account”)

Scenario: New user register with invalid email account
	Given I am at the User Register page
	When I try to create a new user with email “yefo@ufpe.cin.br”
	Then I see an error message (“invalid email account”)

Scenario: Successful user login
	Given I am at the Login page
	When I try to login with email “yefo@cin.ufpe.br” and password “notkidding”
	Then I am redirected to the Main page

Scenario: Successful new user register
	Given I am at the User Register page
	When I try to create a new user with email “yefo@cin.ufpe.br” and password “notkidding” 
	Then I am redirected to the Main page
