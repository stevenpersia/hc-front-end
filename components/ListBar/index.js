import React from "react";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import styles from "../../Styles";

class ListBar extends React.Component {
	render() {
		return (
			<View
				style={{
					height: 40,
					position: "absolute",
					top: 0,
					left: 0,
					width: Dimensions.get("window").width,
					zIndex: 12
				}}
			>
				<Text>This is the list bar component</Text>
			</View>
		);
	}
}

/*
const styles = StyleSheet.create({
	customCSS: {}
});
*/

export default ListBar;
