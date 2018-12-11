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
import axios from 'axios';
import ChallengeCard from '../../components/ChallengeCard';

class Profile extends React.Component {
	state = {
		user: {
			account: {
				username: '',
				avatar: 'Human Challenge SISI LA FAMILLE'
			},
			challenges: {
				player: [],
				manager: []
			}
		},
		tabs: {
			participate: true,
			organizer: false,
			finished: false
		},
		challengesPlayerItems: [],
		challengesManagerItems: [],
		challengesFinishedItems: []
	};

	// Return this if no challenges
	noChallenges = () => {
		return (
			<View>
				<Text style={[styles.h4, styles.textCenter, styles.paddingTop30]}>
					0 défis trouvés
				</Text>
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
			if (this.state.challengesPlayerItems.length === 0) {
				this.noChallenges();
			} else {
				return (
					<FlatList
						data={this.state.challengesPlayerItems}
						keyExtractor={this._keyExtractor}
						renderItem={({ item }) => (
							<View style={{ marginBottom: 1 }}>
								<ChallengeCard id={item._id} challenge={item} />
							</View>
						)}
					/>
				);
			}
		}

		if (organizer === true) {
			if (this.state.challengesManagerItems.length === 0) {
				this.noChallenges();
			} else {
				return (
					<FlatList
						data={this.state.challengesManagerItems}
						keyExtractor={this._keyExtractor}
						renderItem={({ item }) => (
							<View style={{ marginBottom: 1 }}>
								<ChallengeCard id={item._id} challenge={item} />
							</View>
						)}
					/>
				);
			}
		}

		if (finished === true) {
			if (this.state.challengesFinishedItems.length === 0) {
				this.noChallenges();
			} else {
				return (
					<FlatList
						data={this.state.challengesFinishedItems}
						keyExtractor={this._keyExtractor}
						renderItem={({ item }) => (
							<View style={{ marginBottom: 1 }}>
								<ChallengeCard id={item._id} challenge={item} />
							</View>
						)}
					/>
				);
			}
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
		const { username, avatar } = this.state.user.account;
		const { player, manager } = this.state.user.challenges;
		return (
			<View style={[{ alignItem: 'center', justifyContent: 'center' }]}>
				<View
					style={[
						customStyles.avatarContainer,

						{ justifyContent: 'center', textAlign: 'center', width: 'auto' }
					]}
				>
					<View style={{ width: 100 }}>
						<Text style={[styles.h4, styles.textCenter]}>{manager.length}</Text>
						<Text style={[styles.text, styles.textCenter, styles.uppercase]}>
							défis
						</Text>
						<Text style={[styles.text, styles.textCenter, styles.uppercase]}>
							réalisés
						</Text>
					</View>
					<View style={customStyles.avatar}>
						<Image
							style={{ width: 100, height: 100, borderRadius: 50 }}
							source={{ uri: avatar.toString() }}
						/>
					</View>
					<View style={{ width: 100 }}>
						<Text style={[styles.h4, styles.textCenter]}>{player.length}</Text>
						<Text style={[styles.text, styles.textCenter, styles.uppercase]}>
							défis
						</Text>
						<Text style={[styles.text, styles.textCenter, styles.uppercase]}>
							participés
						</Text>
					</View>
				</View>
				<Text style={[styles.h4, styles.paddingV10, styles.textCenter]}>
					{username}
				</Text>
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
				<View>{this.renderList()}</View>
			</View>
		);
	}

	componentDidMount() {
		// Find profile
		axios
			.get(
				'https://human-challenge-back-end.herokuapp.com/api/profile/5c0412b7a380ae141cba4919',
				{
					headers: {
						Authorization:
							'fbCvVAqjvkHYBU83nn613hTqTIeQ7TQIb374DiPUakhfqcOFiPWjLGI0ihDUvZpZ'
					}
				}
			)
			.then(response => {
				console.log(response);
				this.setState({
					user: {
						account: {
							username: response.data.account.username,
							avatar: response.data.account.avatar[0].url
						},
						challenges: {
							player: response.data.challenges.player,
							manager: response.data.challenges.manager
						}
					}
				});

				// // Grab all challenges who participate
				// let challengesPlayerFound = [];
				// for (let i = 0; i < this.state.user.challenges.player.length; i++) {
				// 	axios
				// 		.get(
				// 			`https://human-challenge-back-end.herokuapp.com/api/challenge/${
				// 				this.state.user.challenges.player[i]._id
				// 			}`
				// 		)
				// 		.then(response => {
				// 			challengesPlayerFound.push(response.data);
				// 		})
				// 		.catch(error => {
				// 			console.log(error);
				// 		});
				// }

				// // Grab all challenges who organize
				// let challengesManagerFound = [];
				// for (let i = 0; i < this.state.user.challenges.manager.length; i++) {
				// 	axios
				// 		.get(
				// 			`https://human-challenge-back-end.herokuapp.com/api/challenge/${
				// 				this.state.user.challenges.manager[i]._id
				// 			}`
				// 		)
				// 		.then(response => {
				// 			challengesManagerFound.push(response.data);
				// 		})
				// 		.catch(error => {
				// 			console.log(error);
				// 		});
				// }

				// this.setState({
				// 	challengesPlayerItems: challengesPlayerFound,
				// 	challengesManagerItems: challengesManagerFound,
				// 	challengesFinishedItems: challengesFinishedFound
				// });

				// All finished challenges
				// let challengesFinishedFound = [];

				// for (let i = 0; i < this.state.user.challenges.manager.length; i++) {}

				// for (let i = 0; i < this.state.user.challenges.manager.length; i++) {}
			})
			.catch(error => {
				console.log(error);
			});
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
		marginTop: 20,
		textAlign: 'center'
	},
	tab: {
		paddingVertical: 20,
		width: Dimensions.get('window').width / 3,
		textAlign: 'center'
	}
});

export default Profile;
