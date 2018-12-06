import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import styles from "../../Styles";
import { format, formatDistance, formatRelative, subDays } from "date-fns";
import ChallengeCardItem from "../ChallengeCardItem";

class ChallengeCard extends React.Component {
	render() {
		const { challenge } = this.props;
		console.log(this.props);
		if (challenge.ref === undefined) {
			return (
				<View style={styles.container}>
					<Text>y'a rien</Text>
				</View>
			);
		}
		return (
			<View style={[styles.container, styles.bgGray]}>
				<Text>{challenge.ref.name}</Text>
				<Text>{challenge.owner.account.username}</Text>
				<Text>{challenge.ref.category.name}</Text>
				<ChallengeCardItem
					text={format(challenge.date.beginDate, "dddd DD MMMM")}
				/>
				<ChallengeCardItem text={challenge.adress.city} />

				<Image
					style={{ height: 200, width: 200 }}
					source={{
						uri: challenge.media.images[0].url
					}}
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

export default ChallengeCard;
