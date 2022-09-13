import { Text, View, StyleSheet } from 'react-native'

export function Chapter({ content, fontStyle, modalHandler }) {
	const splitContent = parseChapterContent(content);
	let idx = 0;
	return <View>
		{
			splitContent.map((string) => {
				return <View style={{ marginBottom: fontStyle.fontSize - 4 }} key={idx++} >
					<Paragraph content={string} fontStyle={fontStyle} modalHandler={modalHandler} />
				</View>
			})
		}
	</View>
}

function Paragraph({ content, fontStyle, modalHandler }) {
	const splitContent = parseParagraphContent(content);
	let idx = 0;
	return <Text style={fontStyle}>
		<Text style={fontStyle}>{'\t\t'}</Text>
		{splitContent.map((string) => {
			if (string[0] === '#') {
				return <Text style={[fontStyle, { fontWeight: 'bold' }]} onPress={() => modalHandler(string)} key={idx++}>
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

// Prerequisite: annotations should be in brackets: [An Annotation]
function parseParagraphContent(content) {
	let splitContent = [];
	let normalStr = "";
	let annotation = "";
	for (let i = 0; i < content.length; i++) {
		const c = content[i];
		if (c === "[") {
			splitContent.push(normalStr);
			normalStr = "";
			annotation = "#";
		} else if (c === "]") {
			splitContent.push(annotation);
			annotation = "";
		} else if (annotation) {
			annotation += c;
		} else {
			normalStr += c;
		}
	}
	splitContent.push(normalStr);
	return splitContent;
}

const styles = StyleSheet.create({
	paragraph: {
		marginBottom: 8,
	}
});