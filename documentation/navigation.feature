Feature: Navigating within the Interactive Book app
	As a user, I'd like to be able to navigate between the app's screens so that I can access the app's features easily.

	Scenario: Arriving at the index screen of the app
		Given that I started the app for the first time
		When the app finishes loading
		Then I see the Library screen with the available books
		And I see tabs for Library, Bookmarks, and Settings at the bottom of the screen
		And the Library tab is selected

	Scenario: Opening a book
		Given that I see a book on the Library screen
		When I select the book
		Then I arrive at the selected book's Cover screen
		And the selected book's available chapters are listed

	Scenario: Selecting a chapter
		Given that I selected a book with at least one available chapter
		When I select a chapter
		Then I arrive at the selected chapter's Reading view
		And the selected chapter's contents are displayed

	Scenario Outline: Entering the Bookmarks menu
		Given that I have saved <amount> bookmarks
		And I'm on the Library screen
		When I select the Bookmarks tab
		Then I arrive at the Bookmarks screen
		And <amount> bookmark entries are displayed

		Examples:
			| title                   | amount |
			| Without saved bookmarks | no     |
			| With saved bookmarks    | two    |

	Scenario Outline: Entering the Settings menu
		Given that I'm on the <screen>
		When I select the <button>
		Then I arrive at the Settings screen

		Examples:
			| title            | screen         | button          |
			| From the Library | Library screen | Settings tab    |
			| While reading    | Reading view   | Settings button |

# Annotations:
#		Library screen: the main page with a list of books
#		Cover screen: a book's overview page that displays the book's information and its summary
#		Reading view: a chapter's reader interface with the option to bookmark the chapter
#		Bookmarks screen: a screen for managing the saved bookmarks
#		Settings screen: a screen for every app-related setting
