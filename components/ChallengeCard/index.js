import React from "react";
import {
	StyleSheet,
	Text,
	View,
	Image,
	Dimensions,
	ImageBackground
} from "react-native";
import styles from "../../Styles";
import { format, formatDistance, formatRelative, subDays } from "date-fns";
var frLocale = require("date-fns/locale/fr");
import ChallengeCardItem from "../ChallengeCardItem";
import ChallengeCardCategory from "../ChallengeCardCategory";
import AvatarList from "../AvatarList";

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
			<View
				style={[
					styles.container,
					styles.bgBlack,
					stylesLocal.customCSS,
					{ overflow: "hidden" }
				]}
			>
				<Text style={[styles.textWhite, styles.h4, { zIndex: 2 }]}>
					{challenge.ref.name}
				</Text>
				<Text style={[styles.textWhite, styles.text, { zIndex: 2 }]}>
					{challenge.owner.account.username}
				</Text>
				<View style={{ position: "absolute", top: 8, right: 8, zIndex: 2 }}>
					<ChallengeCardCategory type={challenge.ref.category.name} />
				</View>
				<View style={{ position: "absolute", top: 8, left: 8, zIndex: 2 }}>
					<ChallengeCardItem
						icon="calendar"
						text={format(challenge.date.beginDate, "dddd DD MMMM", {
							locale: frLocale
						})}
					/>
					<ChallengeCardItem icon="pin" text={challenge.adress.city} />
				</View>
				<View style={[{ position: "absolute", bottom: 60, zIndex: 2 }]}>
					<AvatarList challengers={challenge.challengers} />
				</View>

				<Image
					resizeMode="cover"
					style={{
						position: "absolute",
						top: 0,
						left: 0,
						height: "100%",
						width: "100%",
						zIndex: 0,
						opacity: 0.7
					}}
					source={{
						uri: challenge.media.images[0].url
					}}
				/>
			</View>
		);
	}
}

const stylesLocal = StyleSheet.create({
	customCSS: { width: fullW, height: 200 }
});

export default ChallengeCard;
