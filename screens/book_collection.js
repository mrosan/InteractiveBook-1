import { FlatList, View, Pressable, Text, Image, StyleSheet, useWindowDimensions } from 'react-native'
import { useEffect, useState } from 'react'

import { fetchBooks } from '../utils/http'

function BookCollection({ navigation, route }) {
	let [books, setBooks] = useState([]);

	useEffect(() => {
		async function getBooks() {
			return await fetchBooks();
		}
		getBooks().then((res) => {
			setBooks(res);
		});
	}, []);

	function GridItem(itemData) {
		return <View style={styles.gridTile}>
			<Pressable onPress={() => {
				navigation.navigate("BookView", { bookID: itemData.item.bookID });
			}}>
				<View>
					<Image source={{ uri: itemData.item.cover }} style={styles.coverImg} />
					<Text style={styles.title}>{itemData.item.title}</Text>
					{itemData.item.subtitle && <Text style={styles.subtitle}>{itemData.item.subtitle}</Text>}
				</View>
			</Pressable>
		</View>
	}

	const { width, height } = useWindowDimensions();
	const portrait = width < height;
	return <View style={{ alignItems: portrait ? 'center' : 'stretch' }}>
		<FlatList
			data={books}
			key={portrait ? "portraitFLkey" : "landscapeFLkey"}
			keyExtractor={(item) => item.id}
			renderItem={GridItem}
			numColumns={portrait ? 2 : 5}
			style={styles.grid}
			columnWrapperStyle={{ alignItems: 'stretch' }}
			showsVerticalScrollIndicator={false}
		/>
	</View>;
}

export default BookCollection;

const styles = StyleSheet.create({
	grid: {
		padding: 8,
	},
	gridTile: {
		marginHorizontal: 16,
		marginBottom: 16,
		width: 140,
	},
	coverImg: {
		width: '100%',
		height: 210,
		borderRadius: 8,
		overflow: 'hidden'
	},
	title: {
		fontWeight: 'bold',
		fontSize: 20,
		textAlign: 'center'
	},
	subtitle: {
		fontSize: 16,
		textAlign: 'center'
	},
});