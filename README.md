- [Introduction](#introduction)
	- [Summary](#summary)
	- [Motivations and project goals](#motivations-and-project-goals)
- [Behavior-driven documentation](#behavior-driven-documentation)
- [Technical documentation](#technical-documentation)
	- [Tech stack](#tech-stack)
	- [Features](#features)
	- [Plans for the future](#plans-for-the-future)
- [Credits](#credits)

# Introduction
## Summary
In the Interactive Book app, users can read stories while being able to interact with annotations to bring up more information. Annotations can range from illustrations to pieces of lore tied to the story's world, presented in a convenient and easy-to-access manner.

## Motivations and project goals
- Creating a portfolio project that showcases some of my technical skills.
  - The project's core concept should be simple, but it should have plenty of directions in which it could potentially expand.
  - Aside from having common mobile application features, having more unique features would be nice too; something that requires some investigation and cannot be copypasted from a tutorial, e.g. parsing chapter content and creating annotations.
- Creating a project that is actually useful.
  - The app at its core provides a new and (hopefully) fun reader experience. It has the potential to become more than just a demo project.
- Creating a project that I enjoy working on.
  - As someone who writes fantasy novels and short stories as a hobby, having my own platform to share my work on gives me motivation to see this project succeed.
  - Incremental development: the project should have well-defined milestones that can be achieved within a reasonable amount of time. The aim isn't to bring everything together at the very end of the project; instead, the goal is to get those dopamine hits upon reaching milestones while also keeping the application functional.*

(*) _The commit history on the master branch represent the milestones quite accurately._

# Behavior-driven documentation
The scope of the Interactive Book application is written in Gherkin, defined via the Cucumber framework. For the ease of understanding, the following documents should be read in order:

- [Navigation](./documentation/navigation.feature)
- [Reading view](./documentation/reading_view.feature)
- [Bookmarks](./documentation/bookmarks.feature)
- [Settings](./documentation/settings.feature)

# Technical documentation
## Tech stack
- React Native with Expo
  - Wide variety of RN components e.g. Flatlist, Pressable, Modal
  - State handling with Context API
  - AppState and event listeners
  - SQLite database
- React Navigation: Native Stack navigator, Tab navigator
- React Redux
- Firebase backend with Axios

## Features
- Reader interface with in-line pressable annotations
- Reader interface customization via Context API
- Bookmark handling
  - Bookmarks menu with a mix of Tab and Stack navigators
  - App-wide bookmark state handling via Redux
  - Save/Load/Clear bookmarks from local database with SQLite
- Books and annotations loaded on-demand with Firebase

## Plans for the future
- iOS fine-tuning
- Visual improvements
- Themes for the whole app
- Dynamic header (hide on scroll)
- Streamline styles
- Improve HTTP request error handling
- Authentication
  - User feedback support
  - Purchase-only content
- More interactive features
  - Pinch zoom to change fontsize
  - "Choose your own adventure" style books
- Search by genre
- Backend convenience features (streamline book updates)
- ...and of course, many more stories to write!

# Credits
- Art created with [Midjourney](https://www.midjourney.com/)
- Gemslingers inspired by [Path of Exile](https://www.pathofexile.com/)
