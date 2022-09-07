import { createContext, useState } from 'react';

export const ReaderContext = createContext({
	theme: "light",
	fontSize: 18,
	changeTheme: (id) => { },
	changeFontSize: (size) => { }
})

function ReaderContextProvider({ children }) {
	const [theme, setTheme] = useState("light");
	const [fontSize, setFontSize] = useState(18);

	function changeTheme(id) {
		setTheme(id);
	}

	function changeFontSize(size) {
		setFontSize(size);
	}

	const value = {
		theme: theme,
		changeTheme: changeTheme,
		fontSize: fontSize,
		changeFontSize: changeFontSize
	};

	return <ReaderContext.Provider value={value}>{children}</ReaderContext.Provider>
}

export default ReaderContextProvider;