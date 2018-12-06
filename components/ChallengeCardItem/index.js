import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import styles from "../../Styles";
import { Entypo } from "@expo/vector-icons";

class ChallengeCardItem extends React.Component {
	render() {
		return (
			<View style={[styles.container]}>
				<Entypo name="calendar" size={16} color="white" />
				<Text style={[styles.textWhite, styles.small]}>{this.props.text}</Text>
			</View>
		);
	}
}

/*
const styles = StyleSheet.create({
	customCSS: {}
});
*/

export default ChallengeCardItem;
