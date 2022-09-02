// Data samples until backend implementation.

export const Books = [
	{
		id: "gemslingers-1",
		title: "Gemslingers",
		subtitle: "The Exile",
		author: "Márton Rosanics",
		summary: "Gwyn finds himself in more trouble than he has bargained for.",
		genre: ["Fantasy", "Action", "Dystopia"],
		cover: "https://i.imgur.com/rAINdYd.jpg",
		length: "34 pages",
		status: "completed"
	},
	{
		id: "heartful",
		title: "Heartful",
		subtitle: "",
		author: "Márton Rosanics",
		summary: "Connor has a change of heart.",
		genre: ["Sci-Fi", "Thriller", "Biotech"],
		cover: "https://i.imgur.com/xZZK39X.png",
		length: "10 pages",
		status: "completed"
	},
	{
		id: "synergy-1",
		title: "Synergy",
		subtitle: "Successful Failure",
		author: "Márton Rosanics",
		summary: "Transported to an alien world, Randel is forced to play the Game of Ascencension.",
		genre: ["Fantasy", "Adventure", "GameLit"],
		cover: "https://i.imgur.com/HT22xAz.jpg",
		length: "139601 words",
		status: "ongoing"
	}
];

export const Chapters = [
	{
		id: "1",
		bookID: "gemslingers-1",
		title: "Chapter 1",
		content: "Everyone assumes that bounty hunters are tough. Why wouldn’t they be? They put their lives on the line to hunt down monsters and dangerous people. Do it for a while, and nothing fazes you anymore. You become a hardened fighter. A cold-blooded killer.",
		note: "",
		draft: false
	},
	{
		id: "2",
		bookID: "gemslingers-1",
		title: "Chapter 2",
		content: `“Man, I’m so sorry about that [Crackling Lance],” Tom said. “I really am. I've [Concentrated Effect] linked to it, so I thought that I might be able to control the lightning. Make it hit only the lizard, you know?”`,
		note: "",
		draft: false
	},
	{
		id: "3",
		bookID: "gemslingers-1",
		title: "Chapter 3",
		content: "Gwyn felt his stomach twist into a tight knot. He recognized the man who held him at gunpoint, if only because of the embroidered green sigil on his black silk garment. Donroe Lynn, one of House Lynn’s feared enforcers. He had gaunt features and a shaved head, which made the horns curling back from his forehead even more prominent. His face reminded Gwyn of a skull.",
		note: "",
		draft: false
	},
	{
		id: "1",
		bookID: "heartful",
		title: "Prelude",
		content: "heartful (noun): As much as the heart can hold or contain; as much as a person wants or can endure.",
		note: "The preview of this book is not available at this time.",
		draft: true
	},
];
