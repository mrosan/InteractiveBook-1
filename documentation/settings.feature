Feature: The Settings screen of the Interactive Book app
	As a user, I'd like to be able to customize my application, so that it fits my needs better.

	Background:
		Given that I have entered the Settings screen

	Scenario Outline: Changing the Reading view settings
		When I change the <setting>
		Then I see a preview of what the <setting> of Reading view will look like

		Examples:
			| title                  | setting        |
			| Theme setting          | theme          |
			| Font size setting      | font size      |
			| Text alignment setting | text alignment |

	Scenario: Deleting my bookmarks
		Given that I have bookmarks
		When I press the 'Clear bookmarks' button
		Then all of my bookmarks are deleted

	Scenario: Saving bookmarks to the device
		Given that I have bookmarks
		When I press the 'Save bookmarks' button
		Then all of my bookmarks are saved to the device

	Scenario: Loading bookmarks from the device
		When I press the 'Load bookmarks' button
		Then all of the saved bookmarks are laoded from the device
		And the loaded bookmarks replace my current bookmarks
