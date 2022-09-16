import { useContext } from 'react'
import { View, Pressable } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

import { ColorPalette as colors } from '../constants/styles'
import { ReaderContext } from '../state/reader_context'

export function HeaderRightButtons({ navigation, isBookmarked, bookmarkCallback }) {
	const iconSize = 28;
	const theme = useContext(ReaderContext).theme;
	let color = colors[theme].contrast;

	return <View style={{ flexDirection: 'row' }}>
		<Pressable onPress={bookmarkCallback}>
			<Ionicons name={isBookmarked ? 'bookmark' : 'bookmark-outline'} size={iconSize} color={color} />
		</Pressable>
		<Pressable style={{ marginLeft: 16 }} onPress={() => { navigation.navigate("Settings") }}>
			<Ionicons name='settings-sharp' size={iconSize} color={color} />
		</Pressable>
	</View>
}

export function HeaderLeftButtons({ navigation }) {
	const iconSize = 28;
	const theme = useContext(ReaderContext).theme;
	let color = colors[theme].contrast;

	return <View style={{ flexDirection: 'row' }}>
		<Pressable onPress={() => { navigation.goBack() }}>
			<Ionicons name={'arrow-back'} size={iconSize} color={color} />
		</Pressable>
	</View>
}
