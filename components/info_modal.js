import { useContext, useState } from 'react'
import { Modal, Text, View, Pressable, Image, StyleSheet } from 'react-native'

import { UnknownAnnotation } from '../constants/dummy_data'
import { ColorPalette as colors } from '../constants/styles'
import { ReaderContext } from '../state/reader_context'

export function InfoModal({ selectedAnnotation, modalHandler, annotations }) {
	const ctx = useContext(ReaderContext)
	const theme = ctx.theme;
	const fontSize = Math.min(ctx.fontSize, 20);
	const id = selectedAnnotation.substring(1);
	const annotation = annotations[id] ?? UnknownAnnotation;

	// Limitation: currently only 100x100 and 300x100 imgs are supported.
	const [imgWidth, setImgWidth] = useState(100);
	Image.getSize(annotation.img, (w, h) => {
		if (w > (h + 50)) {
			setImgWidth(300);
		}
	}, (errorMsg) => {
		console.log(errorMsg);
	});

	return <Modal visible={selectedAnnotation !== "" && selectedAnnotation !== undefined} animationType='fade' transparent={true}>
		<Pressable style={styles.modalPressable} onPress={() => { modalHandler("") }}>
			<View style={[styles.modalInner, { borderColor: colors[theme].ternary, backgroundColor: colors[theme].secondary }]}>
				<Text style={[styles.title, { color: colors[theme].contrast, fontSize: (fontSize + 4) }]}> {id} </Text>
				<View style={[styles.content]}>
					<View style={[styles.imgPanel]}>
						<Image source={{ uri: annotation.img }} resizeMode='cover' style={[styles.img, { width: imgWidth }]} />
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
		padding: 8,
	},
	imgPanel: {
		marginBottom: 8,
	},
	img: {
		height: 100,
		borderRadius: 24,
		overflow: 'hidden',
	},
	title: {
		fontWeight: 'bold',
		alignSelf: 'center'
	},
	content: {
		flexDirection: 'column',
		padding: 8,
		alignItems: 'center'
	}
});