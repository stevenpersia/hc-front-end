import React from 'react';
import {
	StyleSheet,
	Text,
	View,
	FlatList,
	TouchableOpacity,
	Image,
	Dimensions,
	ImageBackground
} from 'react-native';
import styles from '../../Styles';
import axios from 'axios';
import ChallengeCard from '../../components/ChallengeCard';
import { format } from 'date-fns';
import { AsyncStorage } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import { DrawerActions } from 'react-navigation-drawer';

class Profile extends React.Component {
	static navigationOptions = {
		header: null
	};

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
		challengesFinishedItems: [],
		auth: {
			id: '',
			token: ''
		}
	};

	// Return this if no challenges
	noChallenges = () => {
		return (
			<View
				style={{
					flexDirection: 'column',
					alignItems: 'center',
					justifyContent: 'center'
				}}
			>
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
					onPress={() => this.props.navigation.navigate('ChallengesList')}
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
					style={[styles.buttonSecondary, styles.w100]}
				>
					<Text style={[styles.textCenter, styles.blackColor]}>
						Créer un défi
					</Text>
				</TouchableOpacity>
			</View>
		);
	};

	// Render list of challenges
	renderList = () => {
		const { participate, organizer, finished } = this.state.tabs;

		if (participate) {
			if (this.state.challengesPlayerItems.length === 0) {
				return this.noChallenges();
			} else {
				return (
					<FlatList
						data={this.state.challengesPlayerItems}
						keyExtractor={(item, index) => index.toString()}
						renderItem={({ item }) => (
							<View style={{ marginBottom: 1 }}>
								<ChallengeCard id={item._id} challenge={item} />
							</View>
						)}
					/>
				);
			}
		}

		if (organizer) {
			if (this.state.challengesManagerItems.length === 0) {
				return this.noChallenges();
			} else {
				return (
					<FlatList
						data={this.state.challengesManagerItems}
						keyExtractor={(item, index) => index.toString()}
						renderItem={({ item }) => (
							<View style={{ marginBottom: 1 }}>
								<ChallengeCard id={item._id} challenge={item} />
							</View>
						)}
					/>
				);
			}
		}

		if (finished) {
			if (this.state.challengesFinishedItems.length === 0) {
				return this.noChallenges();
			} else {
				return (
					<FlatList
						data={this.state.challengesFinishedItems}
						keyExtractor={(item, index) => index.toString()}
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
			<View style={[{ justifyContent: 'center' }]}>
				<ImageBackground
					source={require('../../assets/images/bg/02.jpg')}
					style={[styles.fullW, styles.fullH, { resizeMode: 'cover' }]}
				>
					<TouchableOpacity
						onPress={() =>
							this.props.navigation.dispatch(DrawerActions.toggleDrawer())
						}
						style={{ paddingTop: 20, paddingLeft: 20, width: 50 }}
					>
						<Entypo name="list" size={30} color="black" />
					</TouchableOpacity>
					<View
						style={[
							customStyles.avatarContainer,

							{ justifyContent: 'center', textAlign: 'center', width: 'auto' }
						]}
					>
						<View style={{ width: 100 }}>
							<Text style={[styles.h4, styles.textCenter, styles.blackColor]}>
								{player.length}
							</Text>
							<Text
								style={[
									styles.text,
									styles.textCenter,
									styles.uppercase,
									styles.blackColor
								]}
							>
								défis
							</Text>
							<Text
								style={[
									styles.text,
									styles.textCenter,
									styles.uppercase,
									styles.blackColor
								]}
							>
								participés
							</Text>
						</View>
						<View style={customStyles.avatar}>
							<Image
								style={{
									width: 100,
									height: 100,
									borderRadius: 50,
									borderWidth: 3,
									borderColor: '#FFF'
								}}
								source={{ uri: avatar.toString() }}
							/>
						</View>
						<View style={{ width: 100 }}>
							<Text style={[styles.h4, styles.textCenter, styles.blackColor]}>
								{manager.length}
							</Text>
							<Text
								style={[
									styles.text,
									styles.textCenter,
									styles.uppercase,
									styles.blackColor
								]}
							>
								défis
							</Text>
							<Text
								style={[
									styles.text,
									styles.textCenter,
									styles.uppercase,
									styles.blackColor
								]}
							>
								réalisés
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
				</ImageBackground>
				{this.renderList()}
			</View>
		);
	}

	async componentDidMount() {
		const stores = await AsyncStorage.multiGet(['id', 'token']);
		console.log('stores', stores);

		const id = stores[0][1];
		const token = stores[1][1];

		await this.setState({
			auth: {
				id,
				token
			}
		});

		// Find profile
		const response = await axios.get(
			`https://human-challenge-back-end.herokuapp.com/api/profile/${
				this.state.auth.id
			}`,
			{
				headers: {
					Authorization: this.state.auth.token
				}
			}
		);
		// Grab all finished challenges
		let challengesFinishedFound = [];

		// Grab all challenges who participate
		let challengesPlayerFound = [];
		for (let i = 0; i < response.data.challenges.player.length; i++) {
			const res = await axios.get(
				`https://human-challenge-back-end.herokuapp.com/api/challenge/${
					response.data.challenges.player[i]._id
				}`
			);
			if (format(res.data.date.endDate, 'x') > format(new Date(), 'x')) {
				challengesPlayerFound.push(res.data);
			} else {
				challengesFinishedFound.push(res.data);
			}
		}

		// Grab all challenges who organize
		let challengesManagerFound = [];
		for (let i = 0; i < response.data.challenges.manager.length; i++) {
			const res = await axios.get(
				`https://human-challenge-back-end.herokuapp.com/api/challenge/${
					response.data.challenges.manager[i]._id
				}`
			);

			if (format(res.data.date.endDate, 'x') > format(new Date(), 'x')) {
				challengesManagerFound.push(res.data);
			} else {
				challengesFinishedFound.push(res.data);
			}
		}

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
			},
			challengesPlayerItems: challengesPlayerFound,
			challengesManagerItems: challengesManagerFound,
			challengesFinishedItems: challengesFinishedFound
		});
	}
}

const customStyles = StyleSheet.create({
	avatarContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		width: Dimensions.get('window').width - 60,
		marginTop: 10
	},
	avatar: {
		backgroundColor: '#1d262a',
		width: 100,
		height: 100,
		borderRadius: 50,
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
