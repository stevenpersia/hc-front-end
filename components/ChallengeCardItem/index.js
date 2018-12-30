import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import styles from "../../Styles";
import { Entypo } from "@expo/vector-icons";

class ChallengeCardItem extends React.Component {
	renderIcon() {
		if (this.props.icon === "calendar") {
			return (
				<Entypo
					style={{ marginRight: 4 }}
					name="calendar"
					size={16}
					color="white"
				/>
			);
		}
		if (this.props.icon === "pin") {
			return (
				<Entypo
					style={{ marginRight: 4 }}
					name="location-pin"
					size={16}
					color="white"
				/>
			);
		}
		if (this.props.icon === "time") {
			return (
				<Entypo
					style={{ marginRight: 4 }}
					name="time-slot"
					size={16}
					color="white"
				/>
			);
		}

		return null;
	}

	render() {
		return (
			<View style={styles.flexRow}>
				{this.renderIcon()}
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
