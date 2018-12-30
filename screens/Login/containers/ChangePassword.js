import React from 'react';
import axios from 'axios';
import {
	TouchableOpacity,
	Text,
	TextInput,
	KeyboardAvoidingView,
	ImageBackground,
	View,
	Dimensions,
	StyleSheet
} from 'react-native';
import styles from '../../../Styles';

class ChangePassword extends React.Component {
	state = {
		errors: {
			sms: false,
			newPassword: false
		}
	};

	back = e => {
		this.props.prevStep();
	};
	//
	//
	// WE NEED TO ADD ABOVE A POST METHOD TO CHANGE PASSWORD ON BACK END
	//
	//
	send = e => {
		const { smsCodeUser, phoneNumber, newPassword } = this.props;

		// Check if SMS code is good before to go to next step
		if (smsCodeUser && newPassword.length >= 8) {
			axios
				.get(
					'https://api.authy.com/protected/json/phones/verification/check?api_key=9bhtmpYqL2r7zcn4HRHiSIm3fGOVGHoP&via=sms&phone_number=' +
						phoneNumber +
						'&country_code=33&verification_code=' +
						smsCodeUser
				)
				.then(response => {
					console.log('SMS sended', response);

					axios
						.put(
							'https://human-challenge-back-end.herokuapp.com/api/login/forgot',
							{
								account: {
									phoneNumber: phoneNumber
								},
								security: {
									password: newPassword
								}
							}
						)
						.then(response => {
							console.log('Password changed', response);
							this.props.nextStep();
						})
						.catch(error => {
							console.log(error);
						});
				})
				.catch(err => {
					console.log(err);
					this.setState({
						errors: {
							sms: true
						}
					});
				});
		} else {
			this.setState({
				errors: {
					newPassword: true
				}
			});
		}
	};

	render() {
		return (
			<ImageBackground
				source={require('../../../assets/images/bg/02.jpg')}
				style={[styles.fullW, styles.fullH, { flex: 1, resizeMode: 'cover' }]}
			>
				<KeyboardAvoidingView
					style={[styles.container, { justifyContent: 'center' }]}
					behavior="padding"
					enabled
				>
					<Text style={[styles.h4, styles.textBlack]}>
						Changez votre mot de passe
					</Text>
					<Text
						style={[
							styles.text,
							styles.paddingV10,
							styles.w100,
							styles.textCenter,
							styles.textBlack
						]}
					>
						Veuillez confirmer votre numéro de téléphone en renseignant le code
						que vous avez reçu par SMS et un nouveau mot de passe.
					</Text>
					<TextInput
						style={customStyles.input}
						placeholder="Code à 4 chiffres"
						placeholderTextColor="#1d262a"
						keyboardType="numeric"
						maxLength={4}
						onChangeText={value => {
							this.props.handleChange('smsCodeUser', value);
						}}
						value={this.props.smsCodeUser}
					/>
					<Text>{this.state.errors.sms === true ? 'Code invalide' : ''}</Text>

					<TextInput
						style={customStyles.input}
						placeholder="Mot de passe"
						placeholderTextColor="#1d262a"
						secureTextEntry={true}
						onChangeText={value => {
							this.props.handleChange('newPassword', value);
						}}
						value={this.props.newPassword}
					/>
					<Text>
						{this.state.errors.newPassword === true
							? "Mot de passe d'au moins 8 caractères requis"
							: ''}
					</Text>

					<TouchableOpacity
						onPress={this.send}
						style={[customStyles.button, styles.marginV10, styles.w100]}
					>
						<Text style={[styles.textCenter, styles.textWhite]}>
							Changer mon mot de passe
						</Text>
					</TouchableOpacity>
					<TouchableOpacity
						onPress={this.back}
						style={[customStyles.buttonSecondary, styles.w100]}
					>
						<Text style={[styles.textCenter, styles.textBlack]}>Précédent</Text>
					</TouchableOpacity>
				</KeyboardAvoidingView>
			</ImageBackground>
		);
	}
}

const customStyles = StyleSheet.create({
	input: {
		backgroundColor: '#FFF',
		borderRadius: 3,
		padding: 15,
		width: Dimensions.get('window').width - 60,
		margin: 10
	},
	button: {
		backgroundColor: '#1d262a',
		paddingVertical: 15,
		paddingHorizontal: 30,
		borderRadius: 3,
		margin: 10,
		width: Dimensions.get('window').width - 60
	},
	buttonSecondary: {
		paddingVertical: 15,
		paddingHorizontal: 30,
		borderRadius: 3,
		margin: 10,
		borderWidth: 1,
		borderColor: '#1d262a',
		width: Dimensions.get('window').width - 60
	},
	buttonThird: {
		backgroundColor: '#FFF',
		paddingVertical: 15,
		paddingHorizontal: 30,
		borderRadius: 3,
		margin: 10,
		width: Dimensions.get('window').width - 60
	}
});

export default ChangePassword;
