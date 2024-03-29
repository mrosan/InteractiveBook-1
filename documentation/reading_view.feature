Feature: Reading chapters within the Library of Shadeverse app
	As a user, I'd like to be able to access a book's contents so that I can read the book in a convenient manner.

	Scenario: The entire chapter content is accessible
		Given that I selected a chapter
		And the chapter's content doesn't fit to my screen
		When I swipe at my screen
		Then the chapter content scrolls in the direction I've swiped

	Scenario Outline: Customizing the Reading view
		Given that I set a <setting> on the Settings screen
		When I select a chapter
		Then the Reading view has the same <setting> that I've set

		Examples:
			| title             | setting   |
			| Theme setting     | theme     |
			| Font size setting | font size |

	Scenario: Selecting an annotation
		Given that I selected a chapter that has annotations in it
		When I select an annotation
		Then a new overlay appears in the middle of my screen
		And the new overlay displays an image and a description for the selected annotation

	Scenario Outline: Closing an annotation
		Given that I selected an annotation
		When I touch the <location>
		Then the annotation closes

		Examples:
			| title         | location                             |
			| Click inside  | annotation                           |
			| Click outside | the screen outside of the annotation |

	Scenario Outline: Navigating to an adjacent chapter
		Given that I selected a chapter that is not the <position> chapter of the book
		When I press the <direction> button at the end of the chapter
		Then I arrive at the <direction> chapter of the book

		Examples:
			| title           | position | direction |
			| Previous button | first    | previous  |
			| Next button     | last     | next      |
