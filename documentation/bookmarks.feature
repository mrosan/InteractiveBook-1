Feature: Bookmarking chapters in the Interactive Book app
	As a user, I'd like to be able to bookmark chapters,
	so that I can find the place where I stopped reading more easily.

	Scenario: Saving a bookmark in Reading view
		Given that I have opened a chapter
		And the opened chapter is not bookmarked
		When I press the bookmark icon
		Then the chapter is saved as a bookmark

	Scenario: Removing a bookmark in Reading view
		Given that I have opened a chapter
		And the opened chapter is already bookmarked
		When I press the bookmark icon
		Then the chapter is no longer bookmarked

	Scenario: Removing a bookmark on the Bookmarks screen
		Given that I have saved bookmarks
		And I entered the Bookmarks screen
		When I press the delete button next to a bookmark
		Then the corresponding bookmark is removed from the list
		And the Bookmarks screen displays my remaining bookmarks

	Scenario: Selecting a bookmark on the Bookmarks screen
		Given that I have saved bookmarks
		And I entered the Bookmarks screen
		When I select a bookmark
		Then I arrive at the Reading view of the selected bookmark
