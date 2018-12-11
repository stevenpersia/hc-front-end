import React from "react";
import { StyleSheet, Text, View, Image, FlatList } from "react-native";
import styles from "../../Styles";
import { Entypo } from "@expo/vector-icons";
import LittleAvatar from "../LittleAvatar";

class AvatarList extends React.Component {
	renderAvatars(team) {
		const result = [];
		const maxNum = 5;
		const shift = 15;
		const itemWidth = 40;
		let numberItems = maxNum;
		if (team.length < maxNum) {
			numberItems = team.length;
		}

		for (let i = 0; i < maxNum && i < team.length; i++) {
			result.push(
				<LittleAvatar
					key={i}
					name={team[i].account.username}
					photo={team[i].account.avatar[0]}
					number={
						-((itemWidth / 4) * numberItems) + (numberItems - i - 1) * shift
					}
				/>
			);
		}
		return result;
	}

	render() {
		return (
			<View style={[styles.flexRow]}>
				{this.renderAvatars(this.props.challengers)}
			</View>
		);
	}
}

/*
const styles = StyleSheet.create({
	customCSS: {}
});
*/

export default AvatarList;
