import { StatusBar } from 'expo-status-bar';
import { useWindowDimensions } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons'

import BookCollection from './screens/BookCollection';
import Bookmarks from './screens/Bookmarks';
import BookView from './screens/BookView';
import ChapterView from './screens/ChapterView';
import Settings from './screens/Settings';
import { ColorPalette as colors } from './constants/styles';

const Stack = createNativeStackNavigator();
const Tabs = createBottomTabNavigator();

export default function App() {
	return (
		<>
			<StatusBar style='auto' />
			<NavigationContainer>
				<Stack.Navigator screenOptions={DynamicHeaderStyles()}>
					<Stack.Screen name="BooksOverview" component={BooksOverview} options={{ headerShown: false }} />
					<Stack.Screen name="BookView" component={BookView} options={{ title: "Book cover" }} />
					<Stack.Screen name="ChapterView" component={ChapterView} />
				</Stack.Navigator>
			</NavigationContainer>
		</>
	);
}

// App landing page
function BooksOverview() {
	const theme = "light"; // TODO theme switching
	const navigatorStyle = Object.assign({}, DynamicHeaderStyles(), {
		tabBarStyle: { backgroundColor: colors[theme].secondary },
		tabBarActiveTintColor: colors[theme].contrast,
		tabBarInactiveTintColor: colors[theme].off,
		tabBarShowLabel: false
	});
	return <Tabs.Navigator screenOptions={navigatorStyle}>
		<Tabs.Screen name="Library" component={BookCollection} options={{
			tabBarIcon: ({ color, size }) => <Ionicons name='library' size={size} color={color} />
		}} />
		<Tabs.Screen name="Bookmarks" component={Bookmarks} options={{
			tabBarIcon: ({ color, size }) => <Ionicons name='bookmark' size={size} color={color} />
		}} />
		<Tabs.Screen name="Settings" component={Settings} options={{
			tabBarIcon: ({ color, size }) => <Ionicons name='settings' size={size} color={color} />
		}} />
	</Tabs.Navigator>;
}

function DynamicHeaderStyles() {
	const { width, height } = useWindowDimensions();
	const portrait = width < height;
	const theme = "light"; // TODO theme switching

	return {
		headerStyle: { backgroundColor: colors[theme].secondary },
		headerTintColor: colors[theme].contrast,
		headerStatusBarHeight: portrait ? 24 : 12,
		headerTitleStyle: { marginTop: portrait ? 4 : 8 },
		headerTitleAlign: 'center'
	}
}
