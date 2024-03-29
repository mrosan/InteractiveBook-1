import { useContext, useState, useEffect } from 'react'
import { Text, View, ScrollView, Pressable, Button, TextInput, StyleSheet } from 'react-native'
import { useSelector, useDispatch } from 'react-redux';

import { ReaderContext } from '../state/reader_context'
import { emptyBookmarkStore, addBookmark, createUniqueBookmarkID } from '../state/bookmarks_store'
import { fetchBookmarks, clearBookmarks, saveBookmark } from '../utils/database';
import { ColorPalette } from '../constants/styles'

function Settings() {
	const bookmarks = useSelector((state) => state.bookmarksReducer.bookmarks);
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

	function handleJustifyChange() {
		readerCtx.changeTextJustified(!readerCtx.isJustified);
	}

	function handleAnnotationStyleChange() {
		readerCtx.changeAnnotationStyle(!readerCtx.isUnderlined);
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
				<View>
					<TextInput
						placeholder="8 < size < 50"
						keyboardType="numeric"
						value={readerCtx.fontSize}
						onChangeText={handleFontSizeChanger}
						style={styles.input}
					/>
					{
						// Disabled feature: text align setting
						/*<Pressable onPress={handleJustifyChange} style={styles.justifyToggle}>
							<Text style={styles.justifyToggleText}>{"align: " + (readerCtx.isJustified ? 'justified' : 'left')}</Text>
						</Pressable>*/
					}
					<Pressable onPress={handleAnnotationStyleChange} style={styles.justifyToggle}>
						<Text style={[styles.justifyToggleText, readerCtx.isUnderlined ? styles.underlinedText : ""]}>annotation style</Text>
					</Pressable>
				</View>
				<Text style={[{ fontSize: readerCtx.fontSize, textAlign: readerCtx.isJustified ? 'justify' : 'left' }, styles.fontSample]}>
					This is what the text and {
						<Text style={[{ fontSize: readerCtx.fontSize, textAlign: readerCtx.isJustified ? 'justify' : 'left' }, styles.fontSample, readerCtx.isUnderlined ? styles.underlinedText : "", { fontWeight: 'bold' }]}>
							annotations
						</Text>
					} are going to look like while reading a chapter.
				</Text>
				
			</View>
		</View>
		<View style={styles.settingContainer}>
			<Text style={styles.settingTitle}>User data management</Text>
			<Button
				onPress={async () => {
					dispatcher(emptyBookmarkStore());
					await clearBookmarks();
					setBmLoaded("");
					setBmSaved("");
					setBmCleared("Bookmarks cleared from device and memory.");
				}}
				title={"Clear bookmarks"}
				color={ColorPalette.light.secondary}
			/>
			<Text style={styles.bmResult}>{bmCleared}</Text>
			<Button
				onPress={() => {
					clearBookmarks().then(async () => {
						for (let i = 0; i < bookmarks.length; i++) {
							const ids = bookmarks[i].id.split("/");
							await saveBookmark({
								bookID: ids[0],
								chapterID: ids[1],
								bookTitle: bookmarks[i].bookTitle,
								chapterTitle: bookmarks[i].chapterTitle
							});
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
							const { chapterID, bookID, bookTitle, chapterTitle } = res.rows._array[i];
							dispatcher(addBookmark({
								id: createUniqueBookmarkID(bookID, chapterID),
								bookTitle: bookTitle,
								chapterTitle: chapterTitle
							}));
						}
						setBmCleared("");
						setBmSaved("");
						setBmLoaded("Bookmarks loaded.");
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
		width: 120,
		margin: 8,
		borderWidth: 1,
		padding: 8,
	},
	fontSample: {
		flex: 1,
		padding: 4,
	},
	bmResult: {
		alignSelf: 'center',
		padding: 4,
		marginBottom: 4
	},
	justifyToggle: {
		height: 36,
		width: 120,
		margin: 8,
		borderWidth: 1,
		backgroundColor: ColorPalette.light.secondary,
		alignItems: 'center',
		justifyContent: 'center'
	},
	justifyToggleText: {
		color: ColorPalette.light.primary,
		fontSize: 14,
		fontWeight: 'bold'
	},
	underlinedText: {
		textDecorationLine: 'underline'
	}
});