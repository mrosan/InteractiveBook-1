import { useLayoutEffect, useContext, useState } from 'react';
import { Text, View, StyleSheet } from 'react-native'

import { Chapters } from '../constants/dummy_data'
import { ColorPalette as colors } from '../constants/styles'
import { InfoModal } from '../components/info_modal'
import { ReaderContext } from '../state/reader_context'

function ChapterView({ navigation, route }) {
	const id = route.params.chapterID;
	const chapter = Chapters.find((chapter) => chapter.id === id);
	const ctx = useContext(ReaderContext);
	const theme = ctx.theme;
	const fontStyle = {
		color: colors[theme].contrast,
		fontSize: ctx.fontSize
	};
	const splitContent = parseChapterContent(chapter.content);

	useLayoutEffect(() => {
		navigation.setOptions({
			title: chapter.title,
			headerTintColor: colors[theme].contrast,
			headerStyle: {
				backgroundColor: colors[theme].secondary
			},
		});
	}, [id, navigation, ctx]);

	const [selectedAnnotation, setSelectedAnnotation] = useState("");

	function annotationPressed(id) {
		setSelectedAnnotation(id);
	}

	return <View style={[styles.readingArea, { backgroundColor: colors[theme].primary }]}>
		{selectedAnnotation && <InfoModal selectedAnnotation={selectedAnnotation} modalHandler={setSelectedAnnotation} bookID={chapter.bookID} />}
		<Text style={fontStyle}>
			{splitContent.map((string) => {
				if (string[0] === '#') {
					return <Text onPress={() => annotationPressed(string)} style={[fontStyle, { fontWeight: 'bold' }]} key={string + Math.random()/*TODO*/}>
						{string.substring(1)}
					</Text>
				} else {
					return string;
				}
			})}
		</Text>
	</View>
}

export default ChapterView;

function parseChapterContent(content) {
	let splitContent = [];
	let normalStr = "";
	let annotation = "";
	for (let i = 0; i < content.length; i++) {
		const c = content[i];
		if (c === "[") {
			splitContent.push(normalStr);
			normalStr = "";
			annotation = "#";
		} else if (c === "]") {
			splitContent.push(annotation);
			annotation = "";
		} else if (annotation) {
			annotation += c;
		} else {
			normalStr += c;
		}
	}
	splitContent.push(normalStr);
	return splitContent;
}

const styles = StyleSheet.create({
	readingArea: {
		flex: 1,
		padding: 16,
	}
});