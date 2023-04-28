import { createContext, useState } from 'react';

export const ReaderContext = createContext({});

function ReaderContextProvider({ children }) {
	const [theme, setTheme] = useState("light");
	const [fontSize, setFontSize] = useState(18);
	const [isJustified, setIsJustified] = useState(false);
	const [isUnderlined, setIsUnderlined] = useState(false);

	function changeTheme(id) {
		setTheme(id);
	}

	function changeFontSize(size) {
		setFontSize(size);
	}

	function changeTextJustified(isJustified) {
		setIsJustified(isJustified);
	}

	function changeAnnotationStyle(isUnderlined) {
		setIsUnderlined(isUnderlined);
	}

	const value = {
		theme: theme,
		fontSize: fontSize,
		isJustified: isJustified,
		isUnderlined: isUnderlined,
		changeTheme: changeTheme,
		changeFontSize: changeFontSize,
		changeTextJustified: changeTextJustified,
		changeAnnotationStyle: changeAnnotationStyle
	};

	return <ReaderContext.Provider value={value}>{children}</ReaderContext.Provider>
}

export default ReaderContextProvider;