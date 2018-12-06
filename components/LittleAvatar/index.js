import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import styles from "../../Styles";
import { Entypo } from "@expo/vector-icons";

class LittleAvatar extends React.Component {
	paddingNumber = this.props.number;
	renderImage() {
		if (this.props.photo === undefined && this.props.name) {
			let letter = this.props.name;
			letter = letter.split("");
			return <Text style={[styles.textWhite, styles.h3]}>{letter[0]}</Text>;
		} else
			return (
				<Image
					style={{
						width: 40,
						height: 40,
						borderRadius: 20,
						opacity: 1
					}}
					source={{
						uri: this.props.photo.url
					}}
				/>
			);
	}

	render() {
		console.log(this.props);
		return (
			<View
				style={{
					width: 40,
					height: 40,
					backgroundColor: "gray",
					overflow: "hidden",
					borderRadius: 20,
					alignItems: "center",
					justifyContent: "center",
					position: "absolute",
					left: this.paddingNumber
				}}
			>
				{this.renderImage()}
			</View>
		);
	}
}

/*
const styles = StyleSheet.create({
	customCSS: {}
});
*/

export default LittleAvatar;