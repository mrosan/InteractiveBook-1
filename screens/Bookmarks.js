import { Text, View, FlatList, Pressable, StyleSheet } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons'

import { ColorPalette as colors } from '../constants/styles'
import { removeBookmark } from '../state/bookmarks_store'

function Bookmarks() {
	const nav = useNavigation();
	const bookmarks = useSelector((state) => state.bookmarksReducer.bookmarks);
	const dispatcher = useDispatch();

	function Bookmark(itemData) {
		return <BookmarkListItem
			bookTitle={itemData.item.bookTitle}
			chapterTitle={itemData.item.chapterTitle}
			onRemoveBookmark={() => { dispatcher(removeBookmark({ id: itemData.item.id })); }}
			onSelectChapter={() => { nav.navigate("ChapterView", { bookmarkID: itemData.item.id }); }}
		/>
	}

	return <View style={styles.list}>
		{!!bookmarks.length && <FlatList
			data={bookmarks}
			keyExtractor={(item) => item.id}
			renderItem={Bookmark}
		/>}
		{!bookmarks.length && <Text style={styles.empty}>There aren't any bookmarks here.</Text>}
	</View>
}

export default Bookmarks;

function BookmarkListItem({ bookTitle, chapterTitle, onRemoveBookmark, onSelectChapter }) {

	return <View style={styles.listItems}>
		<Pressable style={styles.listContent} onPress={onSelectChapter}>
			<Ionicons name='bookmark' size={36} color={colors.light.secondary} />
			<View style={{ flex: 1 }}>
				<Text style={styles.bookmarkChapter}>{chapterTitle}</Text>
				<Text style={styles.bookmarkBook}>{bookTitle}</Text>
			</View>
		</Pressable>
		<Pressable style={styles.remove} onPress={onRemoveBookmark}>
			<Ionicons name='close-outline' size={28} color={colors.light.secondary} />
		</Pressable>
	</View>
}

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