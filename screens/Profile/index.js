import React from 'react';
import {
	StyleSheet,
	Text,
	View,
	ScrollView,
	FlatList,
	TouchableOpacity,
	Image,
	Dimensions
} from 'react-native';
import styles from '../../Styles';

class Profile extends React.Component {
	state = {
		tabs: {
			participate: true,
			organizer: false,
			finished: false
		}
	};

	// Return this if no challenges
	noChallenges = () => {
		return (
			<View>
				<Text style={[styles.h4, styles.textCenter]}>0 défis trouvés</Text>
				<Text
					style={[
						styles.text,
						styles.paddingV10,
						styles.w100,
						styles.textCenter
					]}
				>
					Nous ne trouvons aucun défis. Pourquoi pas en proposer un ou
					participer à un défi ?
				</Text>
				<TouchableOpacity
					onPress={() => this.props.navigation.navigate('ChallengesMap')}
					style={[
						styles.button,
						styles.primaryButtonColor,
						styles.marginV10,
						styles.w100
					]}
				>
					<Text style={[styles.textCenter, styles.textWhite]}>
						Participer à un défi
					</Text>
				</TouchableOpacity>
				<TouchableOpacity
					onPress={() => this.props.navigation.navigate('CreateChallenge')}
					style={[styles.button, styles.secondaryButtonColor, styles.w100]}
				>
					<Text style={[styles.textCenter, styles.textWhite]}>
						Créer un défi
					</Text>
				</TouchableOpacity>
			</View>
		);
	};

	// Render list of challenges
	renderList = () => {
		const { participate, organizer, finished } = this.state.tabs;

		if (participate === true) {
			return <Text>Liste des défis auxquels je participe.</Text>;
		}

		if (organizer === true) {
			return <Text>Liste des défis que j'organise.</Text>;
		}

		if (finished === true) {
			return <Text>Liste des défis terminés.</Text>;
		}
	};

	// Je particpe - OnPress
	listParticipate = () => {
		this.setState({
			tabs: {
				participate: true,
				organizer: false,
				finished: false
			}
		});
	};

	// J'organise - OnPress
	listOrganizer = () => {
		this.setState({
			tabs: {
				participate: false,
				organizer: true,
				finished: false
			}
		});
	};

	// Terminés - OnPress
	listFinished = () => {
		this.setState({
			tabs: {
				participate: false,
				organizer: false,
				finished: true
			}
		});
	};

	render() {
		return (
			<ScrollView>
				<View style={[styles.container, { justifyContent: 'center' }]}>
					<View style={customStyles.avatarContainer}>
						<View style={{ width: 100 }}>
							<Text style={[styles.h4, styles.textCenter]}>8</Text>
							<Text style={[styles.text, styles.textCenter, styles.uppercase]}>
								défis
							</Text>
							<Text style={[styles.text, styles.textCenter, styles.uppercase]}>
								réalisés
							</Text>
						</View>
						<View style={customStyles.avatar}>
							<Image />
						</View>
						<View style={{ width: 100 }}>
							<Text style={[styles.h4, styles.textCenter]}>3</Text>
							<Text style={[styles.text, styles.textCenter, styles.uppercase]}>
								défis
							</Text>
							<Text style={[styles.text, styles.textCenter, styles.uppercase]}>
								participés
							</Text>
						</View>
					</View>
					<Text style={[styles.h4, styles.paddingV10]}>John Doe</Text>
					<View style={[styles.bgPrimaryColor, customStyles.tabs]}>
						<TouchableOpacity onPress={() => this.listParticipate()}>
							<Text
								style={[styles.textWhite, styles.uppercase, customStyles.tab]}
							>
								Je participe
							</Text>
						</TouchableOpacity>
						<TouchableOpacity onPress={() => this.listOrganizer()}>
							<Text
								style={[styles.textWhite, styles.uppercase, customStyles.tab]}
							>
								J'organise
							</Text>
						</TouchableOpacity>
						<TouchableOpacity onPress={() => this.listFinished()}>
							<Text
								style={[styles.textWhite, styles.uppercase, customStyles.tab]}
							>
								Terminés
							</Text>
						</TouchableOpacity>
					</View>
					<View>
						{this.renderList()}
						{this.noChallenges()}
					</View>
				</View>
			</ScrollView>
		);
	}
}

const customStyles = StyleSheet.create({
	avatarContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		width: Dimensions.get('window').width - 60,
		marginTop: 20
	},
	avatar: {
		backgroundColor: '#DDD',
		width: 100,
		height: 100,
		borderRadius: 100,
		margin: 10
	},
	tabs: {
		flexDirection: 'row',
		width: Dimensions.get('window').width,
		marginVertical: 20
	},
	tab: {
		paddingVertical: 20,
		width: Dimensions.get('window').width / 3,
		textAlign: 'center'
	}
});

export default Profile;
