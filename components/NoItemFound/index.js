import React from "react";
import { StyleSheet, Text, View } from "react-native";
import styles from "../../Styles";

class NoItemFound extends React.Component {
	render() {
		return (
			<View style={styles.container}>
				<Text>No Items</Text>
			</View>
		);
	}
}

/*
const styles = StyleSheet.create({
	customCSS: {}
});
*/

export default NoItemFound;
