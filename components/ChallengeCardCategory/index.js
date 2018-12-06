import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import styles from "../../Styles";
import { Entypo } from "@expo/vector-icons";

class ChallengeCardItem extends React.Component {
	renderIcon() {
		if (this.props.type === "Environnement") {
			return "tree";
		}
		if (this.props.type === "Social") {
			return "hand";
		}
		if (this.props.type === "Animaux") {
			return "feather";
		}
		if (this.props.type === "Culture") {
			return "palette";
		}
		return "emoji-sad";
	}

	render() {
		return (
			<View>
				<Entypo name={this.renderIcon()} size={26} color="white" />
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
