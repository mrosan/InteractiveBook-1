import { useContext } from 'react'
import { View, Pressable } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { ColorPalette as colors } from '../constants/styles'
import { ReaderContext } from '../state/reader_context'
import { useNavigation } from '@react-navigation/native';

export function HeaderRightButtons() {
	const iconSize = 28;
	const navigation = useNavigation();
	const theme = useContext(ReaderContext).theme;
	let color = colors[theme].contrast;

	return <View style={{ flexDirection: 'row' }}>
		<Pressable>
			<Ionicons name='bookmark-outline' size={iconSize} color={color} />
		</Pressable>
		<Pressable style={{ marginLeft: 16 }} onPress={() => { navigation.navigate("Settings") }}>
			<Ionicons name='settings-sharp' size={iconSize} color={color} />
		</Pressable>
	</View>
}
