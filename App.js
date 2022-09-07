import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons'

import BookCollection from './screens/book_collection';
import Bookmarks from './screens/bookmarks';
import BookView from './screens/book_view';
import ChapterView from './screens/chapter_view';
import Settings from './screens/settings';
import ReaderContextProvider from './state/reader_context';
import { HeaderRightButtons } from './components/header_buttons'
import { ColorPalette as colors } from './constants/styles';

const Stack = createNativeStackNavigator();
const Tabs = createBottomTabNavigator();

export default function App() {
	return (
		<>
			<StatusBar style='auto' />
			<ReaderContextProvider>
				<NavigationContainer>
					<Stack.Navigator screenOptions={styles.header}>
						<Stack.Screen name="BooksOverview" component={BooksOverview} options={{ headerShown: false }} />
						<Stack.Screen name="BookView" component={BookView} options={{ title: "Book cover" }} />
						<Stack.Screen name="ChapterView" component={ChapterView} options={{ headerRight: HeaderRightButtons }} />
						<Stack.Screen name="Settings" component={Settings} />
					</Stack.Navigator>
				</NavigationContainer>
			</ReaderContextProvider>
		</>
	);
}

// App landing page
function BooksOverview() {
	return <Tabs.Navigator screenOptions={Object.assign({}, styles.header, styles.footer)}>
		<Tabs.Screen name="Library" component={BookCollection} options={{
			tabBarIcon: ({ color, size }) => <Ionicons name='library' size={size} color={color} />
		}} />
		<Tabs.Screen name="Bookmarks" component={Bookmarks} options={{
			tabBarIcon: ({ color, size }) => <Ionicons name='bookmark' size={size} color={color} />
		}} />
		<Tabs.Screen name="Settings" component={Settings} options={{
			tabBarIcon: ({ color, size }) => <Ionicons name='settings-sharp' size={size} color={color} />
		}} />
	</Tabs.Navigator>;
}

const styles = StyleSheet.create({
	header: {
		headerStyle: { backgroundColor: colors.light.secondary },
		headerTintColor: colors.light.contrast,
		headerTitleAlign: 'center',
	},
	footer: {
		tabBarStyle: { backgroundColor: colors.light.secondary },
		tabBarActiveTintColor: colors.light.contrast,
		tabBarInactiveTintColor: colors.light.off,
		tabBarShowLabel: false
	}
});