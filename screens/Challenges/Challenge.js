import React from 'react';
import {
	StyleSheet,
	Image,
	Text,
	View,
	ScrollView,
	TouchableOpacity,
	Dimensions
} from 'react-native';
import axios from 'axios';
import styles from '../../Styles';
import ChallengeCard from '../../components/ChallengeCard';
import AvatarList from '../../components/AvatarList';
import IconList from '../../components/IconList';
import { format } from 'date-fns';
import ChallengesMap from '../Challenges/ChallengesMap';
import { AsyncStorage } from 'react-native';
import { Entypo } from '@expo/vector-icons';

class Challenge extends React.Component {
	// ... donner une valeur par défaut aux clés de response.data
	state = {
		step: 1,
		isLoading: true,
		user: {
			challenges: {
				manager: ' '
			}
		},
		userParticipated: false,
		auth: {
			id: ' ',
			token: ' '
		},
		idItem: ''
	};

	/* 49 : ---------------id du defi------------- */
	/* 54 :  date de fin est supérieur a la date d'aujourd'hui */
	/* 61 :le defi est terminé */
	/* 66 : sinon on traverse le tableau de challengers  */
	/* 69 : on renvoie le nombre de challengers identifiés   */
	/* 68 :dans ce cas le user participe   */
	componentDidMount() {
		AsyncStorage.multiGet(['id', 'token'], (err, stores) => {
			const id = stores[0][1];
			const token = stores[1][1];

			this.setState(
				{
					auth: {
						id,
						token
					},
					idItem: this.props.navigation.getParam('id', 'NO-ID')
				},
				() => {
					axios
						.get(
							`https://human-challenge-back-end.herokuapp.com/api/challenge/${
								this.state.idItem
							}`
						)
						.then(response => {
							if (
								format(response.data.date.endDate, 'x') <
								format(new Date(), 'x')
							) {
								this.setState({
									finished: true
								});
							} else {
								for (let i = 0; i < response.data.challengers.length; i++) {
									if (response.data.challengers[i]._id === this.state.auth.id) {
										this.setState({
											userParticipated: true,
											finished: false
										});
									}
								}
							}

							this.setState({
								...response.data,
								isLoading: false
							});
						});
				}
			);
		});
	}

	componentDidUpdate(prevProps, prevState) {
		if (this.props.navigation.getParam('id', 'NO-ID') !== prevState.idItem) {
			this.setState(
				{
					idItem: this.props.navigation.getParam('id', 'NO-ID')
				},
				() => {
					axios
						.get(
							`https://human-challenge-back-end.herokuapp.com/api/challenge/${
								this.state.idItem
							}`
						)
						.then(response => {
							if (
								format(response.data.date.endDate, 'x') <
								format(new Date(), 'x')
							) {
								this.setState({
									finished: true
								});
							} else {
								for (let i = 0; i < response.data.challengers.length; i++) {
									if (response.data.challengers[i]._id === this.state.auth.id) {
										this.setState({
											userParticipated: true,
											finished: false
										});
									}
								}
							}

							this.setState({
								...response.data,
								isLoading: false
							});
						});
				}
			);
		}
	}

	handleParticipate = () => {
		axios
			.put(
				`https://human-challenge-back-end.herokuapp.com/api/user/participate/${
					this.state.idItem
				}`,
				{},
				{
					headers: {
						Authorization: this.state.auth.token
					}
				}
			)
			.then(response => {
				this.setState({
					userParticipated: true
				});
			})
			.catch(error => {
				console.log(error);
			});
	};

	handleCancel = () => {
		axios
			.delete(
				`https://human-challenge-back-end.herokuapp.com/api/user/remove/${
					this.state.idItem
				}`,
				{
					headers: {
						Authorization: this.state.auth.token
					}
				}
			)
			.then(response => {
				this.setState({
					userParticipated: false
				});
			})
			.catch(error => {
				console.log(error);
			});
	};

	// Si l'id du UserTest est dans le tableau challenge on retourne le bouton défi
	// Si l'iD du UserTest n'est pas dans le tableau challenge on retourne le bouton
	// On utilise utilise un état fini sans la possibilité de cliquer sur un bouton sinon on participe au defi qd user à participer sinon on annule sa participation//
	renderButton() {
		if (this.state.finished === true) {
			return (
				<TouchableOpacity
					style={{ borderRadius: 7, backgroundColor: '#181818', marginTop: 10 }}
					disabled
				>
					<Text
						style={{
							color: '#FFF',
							fontSize: 20,
							fontWeight: 'bold',
							padding: 20,
							textAlign: 'center',
							width: 160
						}}
					>
						Terminé
					</Text>
				</TouchableOpacity>
			);
		}

		if (this.state.userParticipated === false) {
			return (
				<TouchableOpacity
					onPress={() => this.handleParticipate()}
					style={{ borderRadius: 7, backgroundColor: '#3A72E9', marginTop: 10 }}
				>
					<Text
						style={{
							color: '#FFF',
							fontSize: 20,
							fontWeight: 'bold',
							padding: 20,
							textAlign: 'center',
							width: 160
						}}
					>
						Participer
					</Text>
				</TouchableOpacity>
			);
		} else {
			return (
				<TouchableOpacity
					onPress={() => this.handleCancel()}
					style={{
						borderRadius: 7,
						backgroundColor: '#853ae9',
						marginTop: 10
					}}
				>
					<Text
						style={{
							color: '#FFF',
							fontSize: 20,
							fontWeight: 'bold',
							padding: 20,
							textAlign: 'center',
							width: 160
						}}
					>
						Annuler
					</Text>
				</TouchableOpacity>
			);
		}
	}

	renderTag = () => {
		axios
			.get(
				`https://human-challenge-back-end.herokuapp.com/api/user/${
					this.state.idItem
				}`
			)

			.then(response => {
				if (userParticipated === false) {
					response.data.ref.tags[0];
				}
			})
			.catch(error => {
				console.log(error);
			});
	};
	// -----------------identifier le nombre de challenge dans Manager from Users  -----------------------//

	RenderChallengeCreated = () => {
		axios
			.get(
				`https://human-challenge-back-end.herokuapp.com/api/user/${
					this.state.idItem
				}`
			)
			.then(response => {
				if (userParticipated === true) {
					{
						response.data.user.challenges.length;
					}
				}
			})
			.catch(error => {
				console.log(error);
			});
	};
	// on a importer le style, et on va chercher dedans ce dont on besoin //
	render() {
		if (this.state.isLoading === true) {
			return <Text />;
		}

		let fullW = Dimensions.get('window').width;
		let image = this.state.media.images[0].secure_url;

		console.log(this.state);
		return (
			<ScrollView style={{ resizeMode: 'cover' }}>
				<View style={{ width: fullW, height: 380, overflow: 'hidden' }}>
					<Image style={customStyles.featuredImage} source={{ uri: image }} />
					<TouchableOpacity
						style={{ paddingTop: 20, paddingLeft: 20, width: 50 }}
						onPress={() => this.props.navigation.goBack()}
					>
						<Entypo name="chevron-left" size={30} color="#FFF" />
					</TouchableOpacity>
					<View style={{ alignItems: 'center' }}>
						<Text
							style={[
								styles.h4,
								styles.bold,
								styles.textWhite,
								styles.textCenter,
								styles.margin30,
								{ lineHeight: 30 }
							]}
						>
							{this.state.ref.name}
						</Text>
						<Text style={[styles.textWhite, styles.italic]}>
							Du {format(this.state.date.beginDate, 'DD/MM/YYYY')} au{' '}
							{format(this.state.date.endDate, 'DD/MM/YYYY')}
						</Text>
					</View>
				</View>
				<View style={customStyles.content}>
					<View
						style={{
							position: 'absolute',
							top: -140,
							right: -35,
							alignItems: 'center',
							width: 180
						}}
					>
						<AvatarList challengers={this.state.challengers} variant />
						{this.renderButton()}
					</View>

					<View style={[styles.w100, { marginTop: -60 }]}>
						<Text
							style={[
								styles.bold,
								styles.textBlack,
								styles.paddingTop30,
								styles.paddingBottom10
							]}
						>
							INFORMATIONS
						</Text>
						<Text style={[styles.textJustify, styles.textBlack]}>
							{this.state.ref.description}
						</Text>
						<Text
							style={[
								styles.bold,
								styles.textBlack,
								styles.paddingTop30,
								styles.paddingBottom10
							]}
						>
							ACTIONS
						</Text>
						<Text style={[styles.textJustify, styles.textBlack]}>
							{this.state.ref.action}
						</Text>
						<Text
							style={[
								styles.bold,
								styles.textBlack,
								styles.paddingTop30,
								styles.paddingBottom10,
								{ justifyContent: 'center', display: 'none' }
							]}
						>
							PRE-REQUIS
						</Text>
						<View style={{ flexDirection: 'row', display: 'none' }}>
							<IconList Prerequisites={this.state.ref.prerequisites} />
						</View>
						<Text
							style={[
								styles.bold,
								styles.textBlack,
								styles.paddingTop30,
								styles.paddingBottom10
							]}
						>
							CONTACTER L'ORGANISATEUR
						</Text>
						<View
							style={{
								flexDirection: 'row',
								justifyContent: 'space-between',
								alignItems: 'center'
							}}
						>
							<Image
								style={{ width: 40, height: 40, borderRadius: 20 }}
								source={{ uri: this.state.owner.account.avatar[0].url }}
							/>
							<View>
								<Text>
									<Entypo name="globe" size={13} color="#1d262a" />{' '}
									{this.state.owner.organizer}
								</Text>
								<Text>
									<Entypo name="user" size={13} color="#1d262a" />{' '}
									{this.state.owner.account.username}
								</Text>
							</View>
							<View>
								<Text>
									<Entypo name="email" size={13} color="#1d262a" />{' '}
									{this.state.owner.account.email}
								</Text>
								<Text>
									<Entypo name="phone" size={13} color="#1d262a" />{' '}
									{this.state.owner.account.phoneNumber}
								</Text>
							</View>
						</View>
					</View>
				</View>
				<ChallengesMap loc={this.state.loc} id={this.state._id} />
			</ScrollView>
		);
	}
}

const customStyles = StyleSheet.create({
	content: {
		width: Dimensions.get('window').width - 60,
		padding: 30
	},
	featuredImage: {
		width: Dimensions.get('window').width + 60,
		height: 340,
		marginLeft: -25,
		marginTop: -30,
		position: 'absolute',
		transform: [{ rotate: '10deg' }]
	}
});

export default Challenge;
