import { StyleSheet } from 'react-native';

export const ColorPalette = {
	light: {
		primary: 'white',
		secondary: 'skyblue',
		ternary: 'powderblue',
		contrast: 'black',
		off: 'lightcyan'
	},
	dark: {
		primary: 'black',
		secondary: '#333399',
		ternary: '#2929a3',
		contrast: 'white',
		off: '#202060'
	},
	cozy: {
		primary: '#ffebcc',
		secondary: '#ffc266',
		ternary: '#ffd699',
		contrast: 'black',
		off: '#fff5e6'
	},
}

export const DefaultAppStyle = StyleSheet.create({
	app: {
		flex: 1
	},
	header: {
		headerStyle: { backgroundColor: ColorPalette.light.secondary },
		headerTintColor: ColorPalette.light.contrast,
		headerTitleAlign: 'center',
	},
	footer: {
		tabBarStyle: { backgroundColor: ColorPalette.light.secondary },
		tabBarActiveTintColor: ColorPalette.light.contrast,
		tabBarInactiveTintColor: ColorPalette.light.off,
		tabBarShowLabel: false
	}
});
