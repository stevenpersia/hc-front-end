import React from 'react';
import {
	StyleSheet,
	Text,
	View,
	ActivityIndicator,
	Image,
	Dimensions
} from 'react-native';
import styles from '../../Styles';
import { format, distanceInWords } from 'date-fns';
var frLocale = require('date-fns/locale/fr');

import ChallengeCardItem from '../ChallengeCardItem';
import ChallengeCardCategory from '../ChallengeCardCategory';
import AvatarList from '../AvatarList';

const fullW = Dimensions.get('window').width;
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
							justifyContent: 'center'
						})
					}
				>
					<ActivityIndicator size="large" color="black" />
				</View>
			);
		}
		const detailsLeftChallengeCard = {
			position: 'absolute',
			left: 8,
			zIndex: 2
		};
		let detailsrightChallengeCard = {
			zIndex: 2
		};
		if (this.props.variant) {
			detailsLeftChallengeCard.bottom = 8;
		} else {
			detailsLeftChallengeCard.top = 8;
			detailsrightChallengeCard = {
				position: 'absolute',
				right: 8,
				zIndex: 2,
				top: 8
			};
		}
		return (
			<View
				style={[
					styles.card,
					{
						overflow: 'hidden',
						width: this.props.map ? '100%' : Dimensions.get('window').width,
						borderRadius: this.props.map ? 15 : 0,
						height: this.props.map ? 202 : 250,
						backgroundColor: this.props.color || 'black'
					}
				]}
			>
				<View style={detailsrightChallengeCard}>
					<ChallengeCardCategory
						type={challenge.ref.category.name}
						color={this.props.color}
					/>
				</View>
				<Text
					style={[
						styles.textWhite,
						styles.h4,
						{
							zIndex: 2,
							width: Dimensions.get('window').width - 30,
							textAlign: 'center'
						}
					]}
				>
					{challenge.ref.name}
				</Text>

				<View style={detailsLeftChallengeCard}>
					<ChallengeCardItem
						icon="calendar"
						text={format(challenge.date.beginDate, 'dddd DD MMMM', {
							locale: frLocale
						})}
					/>
					<ChallengeCardItem icon="pin" text={challenge.adress.city} />
				</View>
				{!this.props.variant ? (
					<View style={[{ position: 'absolute', bottom: 25, zIndex: 2 }]}>
						<AvatarList challengers={challenge.challengers} />
					</View>
				) : (
					<View
						style={[{ position: 'absolute', bottom: 8, right: 8, zIndex: 2 }]}
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
						position: 'absolute',
						top: 0,
						left: 0,
						height: this.props.map ? 198 : 250,
						width: '100%',
						zIndex: 0,
						opacity: this.props.map ? 0.95 : 0.7
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
