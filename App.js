import { useEffect, useState, useRef, useCallback } from 'react';
import { View, AppState } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import * as SplashScreen from 'expo-splash-screen';
import { Provider, useSelector, useDispatch } from 'react-redux';

import BooksOverview from './screens/books_overview';
import BookView from './screens/book_view';
import ChapterView from './screens/chapter_view';
import Settings from './screens/settings';
import ErrorScreen from './screens/error';
import ReaderContextProvider from './state/reader_context';
import { initDatabase, saveBookmark, fetchBookmarks, clearBookmarks } from './utils/database';
import { DefaultAppStyle } from './constants/styles';
import { store, addBookmark, emptyBookmarkStore, createUniqueBookmarkID } from './state/bookmarks_store'

const Stack = createNativeStackNavigator();

export default function App() {
	return <Provider store={store}>
		<AppContent />
	</Provider>
}

function AppContent() {
	const dispatcher = useDispatch();
	const [inited, setupError, onLayoutRootView] = initApp(dispatcher);
	// Disabled feature: save bookmarks to database when app goes to the background
	// const bookmarks = useSelector((state) => state.bookmarksR.ids);
	// setupAppStateObserver(inited, bookmarks);

	if (setupError) {
		return <ErrorScreen />
	} else if (!inited) {
		return null;
	}

	return (
		<View style={DefaultAppStyle.app} onLayout={onLayoutRootView}>
			<StatusBar style='auto' />
			<ReaderContextProvider>
				<NavigationContainer>
					<Stack.Navigator screenOptions={DefaultAppStyle.header}>
						<Stack.Screen name="BooksOverview" component={BooksOverview} options={{ headerShown: false }} />
						<Stack.Screen name="BookView" component={BookView} options={{ title: "Book cover" }} />
						<Stack.Screen name="ChapterView" component={ChapterView} options={{}} />
						<Stack.Screen name="Settings" component={Settings} />
					</Stack.Navigator>
				</NavigationContainer>
			</ReaderContextProvider>
		</View>
	);
}

function initApp(dispatcher) {
	const [inited, setInited] = useState(false);
	let errorHappened = false;

	useEffect(() => {
		initDatabase().then(() => {
			// Disabled feature: load bookmarks from database to store at every app init
			/*
			fetchBookmarks().then((res) => {
				dispatcher(emptyBookmarkStore());
				for (let i = 0; i < res.rows._array.length; i++) {
					const { chapterID, bookID } = res.rows._array[i];
					dispatcher(addBookmark({ id: createUniqueBookmarkID(bookID, chapterID) }));
				}
			});
			*/
			setInited(true);
		}).catch(() => {
			errorHappened = true;
		});
		setInited(true);
	}, []);

	const onLayoutRootView = useCallback(() => {
		async function endLoading() {
			await SplashScreen.hideAsync();
		}
		if (inited) {
			endLoading();
		}
	}, [inited]);

	return [inited, errorHappened, onLayoutRootView];
}

function setupAppStateObserver(dbInited, bookmarks) {
	const appState = useRef(AppState.currentState);
	useEffect(() => {
		const subscription = AppState.addEventListener("change", nextAppState => {
			if (["inactive", "background"].includes(nextAppState) && appState.current.match(/active/)) {
				if (dbInited) {
					clearBookmarks().then(() => {
						for (let i = 0; i < bookmarks.length; i++) {
							const ids = bookmarks[i].split("/");
							saveBookmark({ bookID: ids[0], chapterID: ids[1] }).catch((err) => { console.log(err); });
						}
					});
				}
			}
		});
		return () => {
			subscription.remove();
		};
	}, []);
}
