Feature: The Settings screen of the Interactive Book app
	As a user, I'd like to be able to customize my application, so that it fits my needs better.

	Scenario Outline: Changing Reading view settings
		Given I entered the Settings screen
		When I change the <setting>
		Then I see a preview of what the <setting> of Reading view will look like

		Examples:
			| title             | setting   |
			| Theme setting     | theme     |
			| Font size setting | font size |

	# TODO
	Scenario: Deleting my bookmarks
		Given I entered the Settings screen
		When I press the Clear Bookmarks button
		Then all of my bookmarks are deleted
