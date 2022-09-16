import { useContext, useState } from 'react';
import { Text, View, ScrollView, StyleSheet, Pressable, useWindowDimensions } from 'react-native'
import { StackActions } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux'

import { ColorPalette as colors } from '../constants/styles'
import { Chapter } from '../components/chapter_content'
import { InfoModal } from '../components/info_modal'
import { HeaderRightButtons, HeaderLeftButtons } from '../components/header_buttons';
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
		fontSize: ctx.fontSize,
		textAlign: ctx.isJustified ? 'justify' : 'left'
	};
	const bottomButtonStyle = [styles.bottomButton, { borderColor: colors[theme].secondary, backgroundColor: colors[theme].ternary }];

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

	function BottomLeftButtonHandler() {
		const chapter = chapterContent.book.Chapters.find((chap) => chap.id === chapterContent.chapter.id - 1);
		navigation.dispatch(StackActions.replace('ChapterView', { chapter: chapter, book: chapterContent.book, annotations: chapterContent.annotations }));
	}

	function BottomRightButtonHandler() {
		const chapter = chapterContent.book.Chapters.find((chap) => chap.id === chapterContent.chapter.id + 1);
		navigation.dispatch(StackActions.replace('ChapterView', { chapter: chapter, book: chapterContent.book, annotations: chapterContent.annotations }));
	}

	const { width, height } = useWindowDimensions();
	const portrait = width < height;
	return <View style={[portrait ? styles.chapterScreenV : styles.chapterScreenH, { backgroundColor: colors[theme].secondary }]}>
		<ScrollView style={{ backgroundColor: colors[theme].primary }} bounces={false} overScrollMode={'never'}>
			{selectedAnnotation && <InfoModal
				selectedAnnotation={selectedAnnotation}
				modalHandler={setSelectedAnnotation}
				annotations={chapterContent.annotations}
			/>}
			<View style={[styles.header, { backgroundColor: colors[theme].secondary }]}>
				<HeaderLeftButtons navigation={navigation} />
				<Text style={{ color: colors[theme].contrast, fontSize: 20, fontWeight: 'bold' }}>{chapterContent.chapter.title}</Text>
				<HeaderRightButtons navigation={navigation} isBookmarked={chapterIsBookmarked} bookmarkCallback={changeBookmarkStatus} />
			</View>
			<View style={[styles.readingArea, { backgroundColor: colors[theme].primary }]}>
				<Chapter
					content={chapterContent.chapter.content}
					fontStyle={fontStyle}
					modalHandler={setSelectedAnnotation}
				/>
			</View>
			{chapterContent.book.id !== -1 && <View style={styles.bottomButtons} >
				<View style={styles.bottomButtonContainer}>
					{chapterContent.chapter.id !== 1 && <Pressable onPress={BottomLeftButtonHandler} style={bottomButtonStyle}>
						<Text style={[styles.bottomButtonText, { color: colors[theme].contrast }]}> Previous </Text>
					</Pressable>}
				</View>
				<View style={styles.bottomButtonContainer}>
					{chapterContent.chapter.id !== chapterContent.book.Chapters.length && <Pressable onPress={BottomRightButtonHandler} style={bottomButtonStyle}>
						<Text style={[styles.bottomButtonText, { color: colors[theme].contrast }]}> Next	</Text>
					</Pressable>}
				</View>
			</View>}
		</ScrollView>
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

const styles = StyleSheet.create({
	chapterScreenV: {
		paddingTop: 40,
		flex: 1
	},
	chapterScreenH: {
		paddingTop: 24,
		flex: 1
	},
	header: {
		paddingVertical: 8,
		paddingHorizontal: 16,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center'
	},
	readingArea: {
		flex: 1,
		padding: 16,
	},
	bottomButtons: {
		margin: 12,
		marginBottom: 24,
		flexDirection: 'row',
		justifyContent: 'space-between'
	},
	bottomButtonContainer: {
		height: 48,
		width: 120,
	},
	bottomButton: {
		flex: 1,
		padding: 8,
		borderWidth: 2,
		borderRadius: 8,
		alignItems: 'center',
		justifyContent: 'center'
	},
	bottomButtonText: {
		fontSize: 16,
		fontWeight: 'bold'
	}
});