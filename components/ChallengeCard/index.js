import React from "react";
import { StyleSheet, Text, View, Image, Dimensions } from "react-native";
import styles from "../../Styles";
import { format, formatDistance, formatRelative, subDays } from "date-fns";
import ChallengeCardItem from "../ChallengeCardItem";
import ChallengeCardCategory from "../ChallengeCardCategory";

const fullW = Dimensions.get("window").width;
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
			<View style={[styles.container, styles.bgGray, stylesLocal.customCSS]}>
				<Text style={[styles.textWhite, styles.h4]}>{challenge.ref.name}</Text>
				<Text style={[styles.textWhite, styles.h5]}>
					{challenge.owner.account.username}
				</Text>
				<View style={{ position: "absolute", top: 8, right: 8 }}>
					<ChallengeCardCategory type={challenge.ref.category.name} />
				</View>
				<View style={{ position: "absolute", top: 8, left: 8 }}>
					<ChallengeCardItem
						icon="calendar"
						text={format(challenge.date.beginDate, "dddd DD MMMM")}
					/>
					<ChallengeCardItem icon="pin" text={challenge.adress.city} />
				</View>
				{/* <Image
					resizeMode="cover"
					style={{
						position: "absolute",
						top: 0,
						left: 0,
						height: 250,
						width: fullW,
						zIndex: 0,
						opacity: 0.2
					}}
					source={{
						uri: challenge.media.images[0].url
					}}
				/> */}
			</View>
		);
	}
}

const stylesLocal = StyleSheet.create({
	customCSS: { width: fullW, height: 250 }
});

export default ChallengeCard;
