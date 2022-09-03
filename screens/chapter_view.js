import { useLayoutEffect } from 'react';
import { Text } from 'react-native'

import { Chapters } from '../constants/dummy_data'

function ChapterView({ navigation, route }) {
	const id = route.params.chapterID;
	const chapter = Chapters.find((chapter) => chapter.id === id);

	useLayoutEffect(() => {
		navigation.setOptions({
			title: chapter.title,
		});
	}, [id, navigation]);
	return <Text>{chapter.content}</Text>
}

export default ChapterView;