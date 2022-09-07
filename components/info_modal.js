import { useContext } from 'react'
import { Modal, Text, View, Pressable, Image, StyleSheet } from 'react-native'

import { ColorPalette as colors } from '../constants/styles'
import { ReaderContext } from '../state/reader_context'
import { Annotations } from '../constants/dummy_data'

export function InfoModal({ selectedAnnotation, modalHandler, bookID }) {
	const ctx = useContext(ReaderContext)
	const theme = ctx.theme;
	const fontSize = Math.min(ctx.fontSize, 20);
	let annotation;

	const id = selectedAnnotation.substring(1);
	const bookAnnotations = Annotations.find((collection) => collection.bookID === bookID);
	annotation = bookAnnotations.items.find((an) => an.id === id);
	// TODO error handling

	return <Modal visible={selectedAnnotation !== "" && selectedAnnotation !== undefined} animationType='fade' transparent={true}>
		<Pressable style={styles.modalPressable} onPress={() => { modalHandler("") }}>
			<View style={[styles.modalInner, { borderColor: colors[theme].ternary, backgroundColor: colors[theme].secondary }]}>
				<Text style={[styles.title, { color: colors[theme].contrast, fontSize: (fontSize + 4) }]}> {id} </Text>
				<View style={[styles.content]}>
					<View style={[styles.imgPanel]}>
						<Image source={{ uri: annotation.img }} style={styles.img} />
					</View>
					<Text style={{ color: colors[theme].contrast, fontSize: fontSize }}>
						{annotation.desc}
					</Text>
				</View>
			</View>
		</Pressable>
	</Modal>
}

const styles = StyleSheet.create({
	modalPressable: {
		flex: 1,
		backgroundColor: '#5c5c5c90',
		justifyContent: 'center',
	},
	modalInner: {
		flexDirection: 'column',
		borderWidth: 4,
		borderRadius: 16,
		margin: '5%',
		padding: 8
	},
	imgPanel: {
		alignItems: 'center',
	},
	img: {
		width: 100, // TODO %
		height: 100,
		borderRadius: 24,
		overflow: 'hidden',
		marginBottom: 8
	},
	title: {
		fontWeight: 'bold',
		alignSelf: 'center'
	},
	content: {
		flexDirection: 'column',
		padding: 8
	}
});