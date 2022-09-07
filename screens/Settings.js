import { useContext } from 'react'
import { Text, View, ScrollView, Pressable, Button, TextInput, StyleSheet } from 'react-native'
import { ReaderContext } from '../state/reader_context'
import { ColorPalette } from '../constants/styles'

function Settings() {
	const readerCtx = useContext(ReaderContext);
	const theme = ColorPalette[readerCtx.theme];

	function handleFontSizeChanger(value) {
		const size = Number(value);
		if (8 < size && size < 50) {
			readerCtx.changeFontSize(size);
		}
	}

	return <View style={styles.settingsContainer}>
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
				<Text style={[{ fontSize: readerCtx.fontSize }, styles.fontSample]}>This is how large the text is going to be.</Text>
			</View>
		</View>
		<View style={styles.settingContainer}>
			<Text style={styles.settingTitle}>Clear user data</Text>
			<Button
				onPress={() => { }}
				title={"Remove all bookmarks"}
				color={ColorPalette.light.secondary}
			/>
		</View>
	</View>
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
	}
});