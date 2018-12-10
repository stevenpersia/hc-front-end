import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import styles from "../../Styles";
import { Entypo } from "@expo/vector-icons";
import { white } from "ansi-colors";

class ChallengeCardCategory extends React.Component {
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
				<Entypo
					name={this.renderIcon()}
					size={this.props.sizeFont ? Number(this.props.sizeFont) : 26}
					color={this.props.color ? this.props.color : white}
				/>
			</View>
		);
	}
}

/*
const styles = StyleSheet.create({
	customCSS: {}
});
*/

export default ChallengeCardCategory;
