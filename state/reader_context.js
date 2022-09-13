import { createContext, useState } from 'react';

export const ReaderContext = createContext({});

function ReaderContextProvider({ children }) {
	const [theme, setTheme] = useState("light");
	const [fontSize, setFontSize] = useState(18);
	const [isJustified, setIsJustified] = useState(false);

	function changeTheme(id) {
		setTheme(id);
	}

	function changeFontSize(size) {
		setFontSize(size);
	}

	function changeTextJustified(isJustified) {
		setIsJustified(isJustified);
	}

	const value = {
		theme: theme,
		fontSize: fontSize,
		isJustified: isJustified,
		changeTheme: changeTheme,
		changeFontSize: changeFontSize,
		changeTextJustified: changeTextJustified
	};

	return <ReaderContext.Provider value={value}>{children}</ReaderContext.Provider>
}

export default ReaderContextProvider;