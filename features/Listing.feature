Feature: Listing_of_apartments
    Database apartments listed by location.

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