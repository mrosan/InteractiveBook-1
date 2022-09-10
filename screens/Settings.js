import { useContext, useState, useEffect } from 'react'
import { Text, View, ScrollView, Pressable, Button, TextInput, StyleSheet } from 'react-native'
import { useSelector, useDispatch } from 'react-redux';

import { ReaderContext } from '../state/reader_context'
import { emptyBookmarkStore, addBookmark, createUniqueBookmarkID } from '../state/bookmarks_store'
import { fetchBookmarks, clearBookmarks, saveBookmark } from '../utils/database';
import { ColorPalette } from '../constants/styles'

function Settings() {
	const bookmarks = useSelector((state) => state.bookmarksR.ids);
	const dispatcher = useDispatch();
	const readerCtx = useContext(ReaderContext);
	const theme = ColorPalette[readerCtx.theme];
	const [bmCleared, setBmCleared] = useState("");
	const [bmSaved, setBmSaved] = useState("");
	const [bmLoaded, setBmLoaded] = useState("");

	useEffect(() => {
		if (bookmarks.length > 0) {
			setBmCleared("");
		}
	}, [bookmarks]);

	function handleFontSizeChanger(value) {
		const size = Number(value);
		if (8 < size && size < 50) {
			readerCtx.changeFontSize(size);
		}
	}

	return <ScrollView style={styles.settingsContainer}>
		<View style={[styles.settingContainer, { backgroundColor: theme.primary }]}>
			<Text style={[styles.settingTitle, { color: theme.contrast }]}>Chapter reader themes</Text>
			<ScrollView horizontal={true} showsHorizontalScrollIndicator={false} contentContainerStyle={styles.themesContainer}>
				{Object.keys(ColorPalette).map((item) => <Pressable key={item} onPress={() => { readerCtx.changeTheme(item) }}>
					<Text style={[styles.themeSetting, { color: theme.contrast, backgroundColor: item === readerCtx.theme ? theme.secondary : theme.off }]}>
						{item}
					</Text>
				</Pressable>)}
			</ScrollView>
		</View>
		<View style={styles.settingContainer}>
			<Text style={styles.settingTitle}>Chapter reader font size</Text>
			<View style={{ flexDirection: 'row' }}>
				<TextInput
					placeholder="8 < size < 50"
					keyboardType="numeric"
					value={readerCtx.fontSize}
					onChangeText={handleFontSizeChanger}
					style={styles.input}
				/>
				<Text style={[{ fontSize: readerCtx.fontSize }, styles.fontSample]}>This is what the text of the chapters is going to look like.</Text>
			</View>
		</View>
		<View style={styles.settingContainer}>
			<Text style={styles.settingTitle}>User data management</Text>
			<Button
				onPress={async () => {
					dispatcher(emptyBookmarkStore());
					await clearBookmarks();
					setBmCleared("Bookmarks cleared from device and memory.");
					setBmLoaded("");
					setBmSaved("");
				}}
				title={"Clear bookmarks"}
				color={ColorPalette.light.secondary}
			/>
			<Text style={styles.bmResult}>{bmCleared}</Text>
			<Button
				onPress={() => {
					clearBookmarks().then(async () => {
						for (let i = 0; i < bookmarks.length; i++) {
							const ids = bookmarks[i].split("/");
							await saveBookmark({ bookID: ids[0], chapterID: ids[1] });
						}
						setBmCleared("");
						setBmLoaded("");
						setBmSaved("Bookmarks saved.");
					});
				}}
				title={"Save bookmarks to device"}
				color={ColorPalette.light.secondary}
			/>
			<Text style={styles.bmResult}>{bmSaved}</Text>
			<Button
				onPress={() => {
					fetchBookmarks().then((res) => {
						dispatcher(emptyBookmarkStore());
						for (let i = 0; i < res.rows._array.length; i++) {
							const { chapterID, bookID } = res.rows._array[i];
							dispatcher(addBookmark({ id: createUniqueBookmarkID(bookID, chapterID) }));
						}
						setBmCleared("");
						setBmLoaded("Bookmarks loaded.");
						setBmSaved("");
					});
				}}
				title={"Load bookmarks from device"}
				color={ColorPalette.light.secondary}
			/>
			{bmLoaded && <Text style={styles.bmResult}>{bmLoaded}</Text>}
		</View>
	</ScrollView>
}

export default Settings;

const styles = StyleSheet.create({
	settingsContainer: {
		padding: 8,
	},
	settingContainer: {
		paddingVertical: 8,
		paddingHorizontal: 16,
		marginBottom: 16,
		borderRadius: 16,
		backgroundColor: 'white'
	},
	settingTitle: {
		fontSize: 20,
		fontWeight: 'bold',
		marginBottom: 8
	},
	themesContainer: {
		flex: 1,
		justifyContent: 'space-evenly',
	},
	themeSetting: {
		fontSize: 16,
		paddingVertical: 12,
		paddingHorizontal: 20,
		borderRadius: 16
	},
	input: {
		height: 36,
		margin: 8,
		borderWidth: 1,
		padding: 8,
	},
	fontSample: {
		flex: 1,
		padding: 4
	},
	bmResult: {
		alignSelf: 'center',
		padding: 4,
		marginBottom: 4
	}
});