import { Text, View, FlatList, Pressable, StyleSheet } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons'

import { ColorPalette as colors } from '../constants/styles'
import { Books, Chapters } from '../constants/dummy_data'
import { removeBookmark } from '../state/bookmarks_store'

function Bookmarks() {
	const nav = useNavigation();
	const bookmarkIds = useSelector((state) => state.bookmarksR.ids);
	const dispatcher = useDispatch();

	function Bookmark(itemData) {
		const sepIDs = itemData.item.split("/");
		const book = Books.find((book) => book.id === sepIDs[0]);
		const chapter = Chapters.find((chapter) => chapter.id === sepIDs[1] && chapter.bookID === book.id);
		return <BookmarkListItem
			book={book}
			chapter={chapter}
			onRemoveBookmark={() => { dispatcher(removeBookmark({ id: itemData.item })); }}
			onSelectChapter={() => { nav.navigate("ChapterView", { chapterID: chapter.id, bookID: book.id }); }} />
	}

	return <View style={styles.list}>
		{!!bookmarkIds.length && <FlatList
			data={bookmarkIds}
			keyExtractor={(item) => item}
			renderItem={Bookmark}
		/>}
		{!bookmarkIds.length && <Text style={styles.empty}>There aren't any bookmarks here.</Text>}
	</View>
}

function BookmarkListItem({ book, chapter, onRemoveBookmark, onSelectChapter }) {

	return <View style={styles.listItems}>
		<Pressable style={styles.listContent} onPress={onSelectChapter}>
			<Ionicons name='bookmark' size={36} color={colors.light.secondary} />
			<View style={{ flex: 1 }}>
				<Text style={styles.bookmarkChapter}>{chapter.title}</Text>
				<Text style={styles.bookmarkBook}>{book.title + (book?.subtitle ? (": " + book.subtitle) : "")}</Text>
			</View>
		</Pressable>
		<Pressable style={styles.remove} onPress={onRemoveBookmark}>
			<Ionicons name='close-outline' size={28} color={colors.light.secondary} />
		</Pressable>
	</View>
}

export default Bookmarks;

const styles = StyleSheet.create({
	list: {
		flex: 1,
		margin: 24
	},
	listItems: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	listContent: {
		flex: 1,
		flexDirection: 'row',
		borderBottomWidth: 2,
		borderBottomColor: colors.light.ternary,
		borderBottomStartRadius: 12,
		borderBottomEndRadius: 12,
		paddingVertical: 12
	},
	bookmarkBook: {
		fontSize: 12
	},
	bookmarkChapter: {
		fontSize: 16
	},
	remove: {
		alignSelf: 'center',
		padding: 4
	},
	empty: {
		flex: 1,
		margin: 24,
		fontSize: 16,
		alignSelf: 'center'
	}
});