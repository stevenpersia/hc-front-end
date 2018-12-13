import React from "react";
import {
	StyleSheet,
	Text,
	View,
	ActivityIndicator,
	Image,
	Dimensions
} from "react-native";
import styles from "../../Styles";
import { format, distanceInWords } from "date-fns";
var frLocale = require("date-fns/locale/fr");

import ChallengeCardItem from "../ChallengeCardItem";
import ChallengeCardCategory from "../ChallengeCardCategory";
import AvatarList from "../AvatarList";

const fullW = Dimensions.get("window").width;
class ChallengeCard extends React.Component {
	render() {
		const { challenge } = this.props;
		if (
			challenge.ref === undefined ||
			challenge.media.images[0] === undefined
		) {
			return (
				<View
					style={
						([styles.container],
						{
							flex: 1,
							justifyContent: "center"
						})
					}
				>
					<ActivityIndicator size="large" color="black" />
				</View>
			);
		}
		const detailsLeftChallengeCard = {
			position: "absolute",
			left: 10,
			zIndex: 2
		};
		let detailsrightChallengeCard = {
			zIndex: 2
		};
		if (this.props.variant) {
			detailsLeftChallengeCard.bottom = 10;
		} else {
			detailsLeftChallengeCard.top = 10;
			detailsrightChallengeCard = {
				position: "absolute",
				right: 10,
				zIndex: 2,
				top: 10
			};
		}
		return (
			<View
				style={[
					styles.card,
					styles.bgBlack,

					{ overflow: "hidden", width: "100%", borderRadius: 8 }
				]}
			>
				<View style={detailsrightChallengeCard}>
					<ChallengeCardCategory type={challenge.ref.category.name} />
				</View>
				<Text style={[styles.textWhite, styles.h4, { zIndex: 2 }]}>
					{challenge.ref.name}
				</Text>
				<Text style={[styles.textWhite, styles.text, { zIndex: 2 }]}>
					{challenge.owner.account.username}
				</Text>

				<View style={detailsLeftChallengeCard}>
					<ChallengeCardItem
						icon="calendar"
						text={format(challenge.date.beginDate, "dddd DD MMMM", {
							locale: frLocale
						})}
					/>
					<ChallengeCardItem icon="pin" text={challenge.adress.city} />
				</View>
				{!this.props.variant ? (
					<View style={[{ position: "absolute", bottom: 60, zIndex: 2 }]}>
						<AvatarList challengers={challenge.challengers} />
					</View>
				) : (
					<View
						style={[{ position: "absolute", bottom: 10, right: 10, zIndex: 2 }]}
					>
						<ChallengeCardItem
							icon="time"
							text={distanceInWords(
								challenge.date.beginDate,
								challenge.date.endDate,
								{
									locale: frLocale
								}
							)}
						/>
					</View>
				)}

				<Image
					resizeMode="cover"
					style={{
						position: "absolute",
						top: 0,
						left: 0,
						height: 200,
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
	customCSS: { width: fullW }
});

export default ChallengeCard;
