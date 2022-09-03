import { View, Text, Image, StyleSheet, FlatList, Pressable, useWindowDimensions } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

import { Books, Chapters } from '../constants/dummy_data'
import { ColorPalette as colors } from '../constants/styles';

function BookView({ route, navigation }) {
	const id = route.params.bookID;
	const book = Books.find((book) => book.id === id);
	const chapters = Chapters.filter((chapter) => chapter.bookID === id);
	const theme = "light"; // TODO theme switching
	const B = (props) => <Text style={{ fontWeight: 'bold' }}>{props.children}</Text>
	const { width, height } = useWindowDimensions();
	const portrait = width < height;

	return <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-start' }}>
		<View style={{ flex: 1, justifyContent: 'flex-start' }}>
			<View style={styles.overview}>
				<Image source={{ uri: book.cover }} style={styles.coverImg} />
				<View style={styles.details}>
					<Text style={styles.title}>{book.title}</Text>
					{book.subtitle && <Text style={styles.subtitle}>{book.subtitle}</Text>}
					<View style={styles.detailTextContainer}>
						<View style={styles.genres}>
							{book.genre.map((genre) => {
								return <Text key={genre}
									style={[styles.genre, { backgroundColor: colors[theme].ternary }]}> {genre}
								</Text>
							})}
						</View>
						<Text><B>Author:</B> {book.author}</Text>
						<Text><B>Length:</B> {book.length}</Text>
						<Text><B>Status:</B> {book.status}</Text>
					</View>
				</View>
			</View>
			<Text style={[styles.summary, { color: colors[theme].contrast }]}><B>Synopsis:</B> {book.summary}</Text>
			{portrait && <ChapterListContainer chapters={chapters} theme={theme} navigation={navigation} portraitMode={portrait} />}
		</View>
		{!portrait && <ChapterListContainer chapters={chapters} theme={theme} navigation={navigation} portraitMode={portrait} />}
	</View>
}

function ChapterListContainer({ chapters, theme, navigation, portraitMode }) {
	const nav = navigation;
	return <View style={[styles.chapterList, portraitMode ? styles.chapterListBorder : {}, { borderTopColor: colors[theme].ternary }]}>
		{!!chapters.length && <FlatList
			data={chapters}
			keyExtractor={(item) => item.id}
			renderItem={ChapterListItem.bind(nav)}
			showsVerticalScrollIndicator={false}
		/>}
		{!chapters.length && <Text>No chapters are available at this time.</Text>}
	</View>
}

function ChapterListItem(itemData) {
	return <Pressable android_ripple={{ color: '#ccc' }} onPress={() => {
		this.navigate("ChapterView", { chapterID: itemData.item.id });
	}}>
		<View style={{ flexDirection: 'row', alignContent: 'center' }}>
			<View style={{ justifyContent: 'center' }}><Ionicons name='book' size={24} color={'black'} /></View>
			<Text style={styles.chapterListItem}>{itemData.item.title}</Text>
		</View>
	</Pressable>
}

export default BookView;

const styles = StyleSheet.create({
	overview: {
		flexDirection: 'row',
		padding: 16,
	},
	coverImg: {
		width: 100,
		height: 150,
		borderRadius: 8,
		overflow: 'hidden',
	},
	details: {
		paddingHorizontal: 16,
	},
	title: {
		fontWeight: 'bold',
		fontSize: 20,
		textAlign: 'center'
	},
	subtitle: {
		fontSize: 12,
		textAlign: 'center',
	},
	detailTextContainer: {
		marginVertical: 12,
	},
	genres: {
		flexDirection: 'row',
		justifyContent: 'flex-start',
		marginBottom: 4
	},
	genre: {
		borderRadius: 16,
		paddingHorizontal: 4,
		paddingVertical: 2,
		marginHorizontal: 4
	},
	summary: {
		marginHorizontal: 16
	},
	chapterList: {
		flex: 1,
		margin: 24,
	},
	chapterListBorder: {
		borderTopWidth: 2,
		borderTopStartRadius: 48,
		borderTopEndRadius: 48,
		paddingTop: 16,
	},
	chapterListItem: {
		fontWeight: 'bold',
		fontSize: 20,
		padding: 8,
	}
});