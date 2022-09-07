- [Introduction](#introduction)
	- [Summary](#summary)
	- [Motivations and project goals](#motivations-and-project-goals)
- [Behavior-driven documentation](#behavior-driven-documentation)
- [Technical documentation](#technical-documentation)
	- [Technology stack](#technology-stack)
	- [Features](#features)
	- [Plans for the future](#plans-for-the-future)
- [Credits](#credits)

# Introduction
## Summary
In the Interactive Book app, users can read stories while being able to interact with certain annotations to bring up more information about the given topic. Annotations can range from illustrations to pieces of lore tied to the story's world, all presented in a convenient and easy-to-access manner.

## Motivations and project goals
- Creating a portfolio project that showcases some of my technical skills.
  - The project's core concept should be simple, but it should have plenty of directions in which it could potentially expand.
  - Showcasing common mobile application features is nice, but it would also be good to have some more unique features too. Features that require some investigation and cannot be copypasted from a tutorial (e.g. parsing chapter content and creating annotations).
- Creating a project that I enjoy working on.
  - As someone who writes fantasy short stories and novels as a hobby, having my own platform to share my work on gives me motivation to see this project succeed.
- Creating a project that is actually useful.
  - The project at its core provides a new and (hopefully) fun reader experience.
  - With further development the core set of features could be easily extended with e.g. different kinds of interactive panels, gathering reader feedback, allowing beta-readers to send suggestions, and even monetization.

# Behavior-driven documentation
The scope of the Interactive Book application is written in Gherkin, defined via the Cucumber framework. For the ease of understanding, the following documents should be read in order:

- [Navigation](./documentation/navigation.feature)
- [Reading view](./documentation/reading_view.feature)
- Bookmarks
- [Settings](./documentation/settings.feature)

# Technical documentation
## Technology stack
- React Native with Expo
- TBA

## Features
- React Navigation: Native Stack navigator, Tab navigator
- Wide variety of React Native components e.g. Flatlist, Pressable, Modal
- State handling with Context API
- TBA

## Plans for the future
- iOS fine-tuning
- Themes for the whole app
- Authentication
  - User feedback support
  - Purchase-only content
- More interactive features
  - Pinch zoom to change fontsize
  - "Choose your own adventure" style books
- TBA

# Credits
- Art created with [Midjourney](https://www.midjourney.com/)
- Gemslingers inspired by [Path of Exile](https://www.pathofexile.com/)
- TBA 
