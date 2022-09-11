import { View, Text, Image, StyleSheet, FlatList, Pressable, useWindowDimensions } from 'react-native'
import { useLayoutEffect, useState } from 'react'
import { Ionicons } from '@expo/vector-icons'

import { LoadingBook } from '../constants/dummy_data'
import { ColorPalette as colors } from '../constants/styles'
import { fetchBookWithAnnotation } from '../utils/http'

function BookView({ route, navigation }) {
	const B = (props) => <Text style={{ fontWeight: 'bold' }}>{props.children}</Text>
	const { width, height } = useWindowDimensions();
	const portrait = width < height;

	const id = route.params.bookID;
	let [book, setBook] = useState(LoadingBook);
	let [annotations, setAnnotations] = useState([]);

	useLayoutEffect(() => {
		async function getBook() {
			return await fetchBookWithAnnotation(id);
		}
		getBook().then((res) => {
			if (!!res) {
				setBook(res.book);
				setAnnotations(res.annotations);
			}
		});
	}, []);

	if (book.id === 'loading') {
		return <View></View> // TODO loading screen
	}

	return <View style={styles.page}>
		<View style={{ flex: 1, justifyContent: 'flex-start' }}>
			<View style={styles.overview}>
				<Image source={{ uri: book.cover }} style={styles.coverImg} />
				<View style={styles.details}>
					<Text style={styles.title}>{book.title}</Text>
					{book.subtitle && <Text style={styles.subtitle}>{book.subtitle}</Text>}
					<View style={styles.detailTextContainer}>
						<View style={styles.genres}>
							{book.genre.map((genre) => <Text key={genre + book.id} style={styles.genre}>{genre}</Text>)}
						</View>
						<Text><B>Author:</B> {book.author}</Text>
						<Text><B>Length:</B> {book.length}</Text>
						<Text><B>Status:</B> {book.status}</Text>
					</View>
				</View>
			</View>
			<Text style={styles.summary}><B>Synopsis:</B> {book.summary}</Text>
			{portrait && <ChapterListContainer book={book} annotations={annotations} navigation={navigation} portraitMode={portrait} />}
		</View>
		{!portrait && <ChapterListContainer book={book} annotations={annotations} navigation={navigation} portraitMode={portrait} />}
	</View>
}

function ChapterListContainer({ book, annotations, navigation, portraitMode }) {
	const chapters = book.Chapters;

	function ChapterListItem(itemData) {
		return <Pressable android_ripple={{ color: '#ccc' }} onPress={() => {
			navigation.navigate("ChapterView", { chapter: itemData.item, book: book, annotations: annotations });
		}}>
			<View style={{ flexDirection: 'row', alignContent: 'center' }}>
				<View style={{ justifyContent: 'center' }}><Ionicons name='book' size={24} color={'black'} /></View>
				<Text style={styles.chapterListItem}>{itemData.item.title}</Text>
			</View>
		</Pressable>
	}

	return <View style={[styles.chapterList, portraitMode ? styles.chapterListBorder : {}]}>
		{!!chapters.length && <FlatList
			data={chapters}
			keyExtractor={(item) => item.id.toString() + book.id}
			renderItem={ChapterListItem}
			showsVerticalScrollIndicator={false}
		/>}
		{!chapters.length && <Text>No chapters are available at this time.</Text>}
	</View>
}



export default BookView;

const styles = StyleSheet.create({
	page: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'flex-start'
	},
	overview: {
		flexDirection: 'row',
		padding: 16
	},
	coverImg: {
		width: 100,
		height: 150,
		borderRadius: 8,
		overflow: 'hidden'
	},
	details: {
		paddingHorizontal: 16
	},
	title: {
		fontWeight: 'bold',
		fontSize: 20,
		textAlign: 'center'
	},
	subtitle: {
		fontSize: 12,
		textAlign: 'center'
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
		fontSize: 12,
		borderRadius: 16,
		paddingHorizontal: 4,
		marginHorizontal: 4,
		backgroundColor: colors.light.ternary
	},
	summary: {
		marginHorizontal: 16
	},
	chapterList: {
		flex: 1,
		margin: 24
	},
	chapterListBorder: {
		borderTopWidth: 2,
		borderTopStartRadius: 48,
		borderTopEndRadius: 48,
		borderTopColor: colors.light.ternary,
		paddingTop: 16
	},
	chapterListItem: {
		fontWeight: 'bold',
		fontSize: 20,
		padding: 8
	}
});