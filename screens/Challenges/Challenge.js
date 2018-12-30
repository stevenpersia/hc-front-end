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
import { Tooltip } from 'react-native-elements';
import ChallengesMap from '../Challenges/ChallengesMap';
import { format } from 'date-fns';
import { hidden } from 'ansi-colors';
import { Entypo } from '@expo/vector-icons';

const userTest = '5c069853c6e471212ce8b71c';

class Challenge extends React.Component {
	// ... donner une valeur par défaut aux clés de response.data
	state = {
		step: 1,
		isLoading: true
		//  ref.category.name
	};

	componentDidMount() {
		axios
			.get(
				'https://human-challenge-back-end.herokuapp.com/api/challenge/5c07ab4fa5d7c100890b9877'
			)
			.then(response => {
				/* console.log("responsedata", response.data); */
				this.setState(
					{
						...response.data,
						isLoading: false
					},
					() => {
						/* console.log("challenge", this.state); */
					}
				);
			});
	}
	// basculer la position du challenge en récupérant le UseriD//
	// envoyer le token
	toggleChallenge(userId) {
		axios.put(
			'https://human-challenge-back-end.herokuapp.com/api/user/participate/5c07ab4fa5d7c100890b9877',
			{ 'security.token': req.headers.authorization.replace('Bearer ', '') }
		);
		console.log(userId);
	}
	//Si l'id du UserTest est dans le tableau challenge on retourne le bouton défi
	//Si l'iD du UserTest n'est pas dans le tableau challenge on retourne le bouton
	renderButton() {
		const challengers = this.state.challengers;
		const buttonText = 'PARTICIPER';
		if (challengers.indexOf(userTest) > -1) {
			buttonText = 'ANNULER';
		}
		return (
			<TouchableOpacity
				onPress={() => this.toggleChallenge(userTest)}
				style={{ borderRadius: 7, backgroundColor: '#3A72E9', marginTop: 10 }}
			>
				<Text
					style={{
						color: '#FFF',
						fontSize: 20,
						fontWeight: 'bold',
						padding: 20,
						textAlign: 'center'
					}}
				>
					{buttonText}
				</Text>
			</TouchableOpacity>
		);
	}

	render() {
		if (this.state.isLoading === true) {
			return <Text />;
		}

		let fullW = Dimensions.get('window').width;
		let image = this.state.media.images[0].secure_url;

		return (
			<ScrollView style={{ resizeMode: 'cover' }}>
				<View style={{ width: fullW, height: 380, overflow: hidden }}>
					<Image style={customStyles.featuredImage} source={{ uri: image }} />
					<TouchableOpacity
						style={{ paddingTop: 20, paddingLeft: 20, width: 50 }}
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
						<Text style={[styles.bold, styles.textBlack, styles.paddingTop30]}>
							INFORMATIONS
						</Text>
						<Text style={[styles.textJustify, styles.textBlack]}>
							{this.state.ref.description}
						</Text>
						<Text style={[styles.bold, styles.textBlack, styles.paddingTop30]}>
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
								{ justifyContent: 'center' }
							]}
						>
							PRE-REQUIS
						</Text>
						<View>
							<Text>Rendre le composant pré-requis dynamique.</Text>
							{/*<IconList Prerequisites={this.state.ref.prerequisites} />*/}
						</View>
						<Text style={[styles.bold, styles.textBlack, styles.paddingTop30]}>
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
