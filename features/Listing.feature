Feature: Listing_of_apartments
    Database apartments listed by location.

# Positive scenarios

Scenario: Test filter operation
Given I'm on the list of apartments by location
When I use filters option and select pool
Then I only see apartments with a pool listed

Scenario: Clicking on an apartment
Given I am on the list of "apartments-by-location"
When I click on one of the listed ads
Then I am redirected to the ad stealth screen
And I have the option to get in touch

Scenario: Favorite an apartment
Given I am on the list of apartments by location
When I click on the favorite button of one of the ads
Then the favorite icon is darkened
When I click on favorites
Then I am redirected to the favorites list
And I can see the previously favorited ad.

Scenario: Apartment search
Given I am on the list of apartments by location
When I click on the search bar
And I type the name anúncio 8
Then I see the filtered list of apartments with the name anúncio 8

# Negative scenarios

Scenario: test filter operation fails
Since I am on the list of apartments by location
When I use the filters option and select pool
Then an error message appears ("no property fits the filter")

Scenario: Clicking on an apartment
Since I'm on the list of "apartments by location"
When I click on one of the listed ads
<<<<<<< HEAD
Then I see an error message "This property is not in the database"
Then question.
=======
Then I see an error message "This property is not in the database"x
>>>>>>> desenvolvimento

Scenario: apartment search
Since I am on the list of apartments by location
When I click on the search bar
And I type the ad name 8
<<<<<<< HEAD
Then I see the error message "Unable to find a property with that name"
=======
Then I see an error message "No property was found with that name"

Scenario: desenvolvimento
>>>>>>> desenvolvimento
