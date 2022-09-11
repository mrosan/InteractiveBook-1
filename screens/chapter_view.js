import { useLayoutEffect, useContext, useState } from 'react';
import { Text, View, StyleSheet } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'

import { ColorPalette as colors } from '../constants/styles'
import { InfoModal } from '../components/info_modal'
import { HeaderRightButtons } from '../components/header_buttons';
import { ReaderContext } from '../state/reader_context'
import { addBookmark, removeBookmark, createUniqueBookmarkID } from '../state/bookmarks_store'
import { fetchBookWithAnnotation } from '../utils/http'

function ChapterView({ navigation, route }) {
	const ctx = useContext(ReaderContext);
	const bookmarks = useSelector((state) => state.bookmarksReducer.bookmarks);
	const dispatcher = useDispatch();
	const [selectedAnnotation, setSelectedAnnotation] = useState("");
	const [chapterContent, setChapterContent] = useState({
		book: route.params.book ?? { id: -1, title: "Loading..." },
		chapter: route.params.chapter ?? { id: -1, content: "" },
		annotations: route.params.annotations ?? [],
	});
	const bmID = route.params.bookmarkID ?? createUniqueBookmarkID(chapterContent.book.id, chapterContent.chapter.id);
	const chapterIsBookmarked = bookmarks.map((b) => b.id).includes(bmID);
	const [chapterIsLoaded, setChapterIsLoaded] = useState(chapterContent.chapter?.id !== -1);

	if (!chapterIsLoaded) {
		loadChapterContent(bmID).then((res) => {
			setChapterIsLoaded(true);
			setChapterContent(res);
		});
	}

	const theme = ctx.theme;
	const fontStyle = {
		color: colors[theme].contrast,
		fontSize: ctx.fontSize
	};
	const splitContent = parseChapterContent(chapterContent.chapter.content);

	function changeBookmarkStatus() {
		if (chapterIsLoaded) {
			if (chapterIsBookmarked) {
				dispatcher(removeBookmark({ id: bmID }));
			} else {
				dispatcher(addBookmark({
					id: bmID,
					bookTitle: chapterContent.book.title + (chapterContent.book?.subtitle ? (": " + chapterContent.book.subtitle) : ""),
					chapterTitle: chapterContent.chapter.title
				}));
			}
		}
	}

	function HeaderRightButtonsWrapper() {
		return <HeaderRightButtons
			navigation={navigation}
			isBookmarked={chapterIsBookmarked}
			bookmarkCallback={changeBookmarkStatus}
		/>
	}

	useLayoutEffect(() => {
		navigation.setOptions({
			title: chapterContent.chapter.title,
			headerTintColor: colors[theme].contrast,
			headerStyle: {
				backgroundColor: colors[theme].secondary
			},
			headerRight: HeaderRightButtonsWrapper
		});
	}, [chapterContent.chapter.title, navigation, ctx, changeBookmarkStatus]);

	// TODO previous/next chapter buttons to the bottom
	return <View style={[styles.readingArea, { backgroundColor: colors[theme].primary }]}>
		{selectedAnnotation && <InfoModal
			selectedAnnotation={selectedAnnotation}
			modalHandler={setSelectedAnnotation}
			annotations={chapterContent.annotations}
		/>}
		<Text style={fontStyle}>
			{splitContent.map((string) => {
				if (string[0] === '#') {
					return <Text onPress={() => setSelectedAnnotation(string)} style={[fontStyle, { fontWeight: 'bold' }]} key={string + Math.random()/*TODO*/}>
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

async function loadChapterContent(bookmarkID) {
	const sepIDs = bookmarkID.split("/");
	const result = await fetchBookWithAnnotation(sepIDs[0]);
	return {
		book: result.book,
		chapter: result.book.Chapters.find((chap) => chap.id == sepIDs[1] /*not ===*/),
		annotations: result.annotations
	}
}

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