import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import BookCollection from './book_collection';
import Bookmarks from './bookmarks';
import Settings from './settings';
import { DefaultAppStyle } from '../constants/styles';

const Tabs = createBottomTabNavigator();

function BooksOverview() {
	return <Tabs.Navigator screenOptions={Object.assign({}, DefaultAppStyle.header, DefaultAppStyle.footer)}>
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

export default BooksOverview;