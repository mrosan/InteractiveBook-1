import { Text, View, StyleSheet } from 'react-native'

export function Chapter({ content, fontStyle, annotationStyle, modalHandler }) {
	const splitContent = parseChapterContent(content);
	let idx = 0;
	return <View>
		{
			splitContent.map((string) => {
				return <View style={{ marginBottom: fontStyle.fontSize - 4 }} key={idx++} >
					<Paragraph content={string} fontStyle={fontStyle} annotationStyle={annotationStyle} modalHandler={modalHandler} />
				</View>
			})
		}
	</View>
}

function Paragraph({ content, fontStyle, annotationStyle, modalHandler }) {
	const splitContent = parseParagraphContent(content);
	let idx = 0;
	return <Text style={fontStyle}>
		<Text style={fontStyle}>{'\t\t'}</Text>
		{splitContent.map((string) => {
			if (string[0] === '#') {
				return <Text style={[fontStyle, annotationStyle]} onPress={() => modalHandler(string)} key={idx++}>
					{string.substring(1)}
				</Text>
			} else if (string[0] === '>') {
				return <Text style={[fontStyle, { fontStyle: 'italic' }]} key={idx++}>
					{string.substring(1)}
				</Text>
			} else {
				return <Text style={fontStyle} key={idx++}>{string}</Text>;
			}
		})}
	</Text>
}

// Prerequisite: New lines should be marked by this character: |
function parseChapterContent(content) {
	return content.split("|");
}

// Prerequisites:
// - annotations should be in brackets: [An Annotation]
// - quotes or italics are marked >like this< or >this
export function parseParagraphContent(content) {
	let splitContent = [];
	let normalStr = "";
	let specialStr = "";
	for (let i = 0; i < content.length; i++) {
		const c = content[i];
		if (["[", ">"].includes(c)) {
			splitContent.push(normalStr);
			normalStr = "";
			specialStr = c === "[" ? "#" : ">";
		} else if (["]", "<"].includes(c)) {
			splitContent.push(specialStr);
			specialStr = "";
		} else if (specialStr) {
			specialStr += c;
		} else {
			normalStr += c;
		}
	}
	if (specialStr) {
		splitContent.push(specialStr);
	}
	splitContent.push(normalStr);
	return splitContent;
}

const styles = StyleSheet.create({
	paragraph: {
		marginBottom: 8,
	}
});