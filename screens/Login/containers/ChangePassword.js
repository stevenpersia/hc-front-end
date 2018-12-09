import React from 'react';
import axios from 'axios';
import {
	TouchableOpacity,
	Text,
	TextInput,
	KeyboardAvoidingView
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
		e.preventDefault();
		this.props.prevStep();
	};
	//
	//
	// WE NEED TO ADD ABOVE A POST METHOD TO CHANGE PASSWORD ON BACK END
	//
	//
	send = e => {
		const { smsCodeUser, phoneNumber, newPassword } = this.props;
		e.preventDefault();
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
					this.props.nextStep();
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
			<KeyboardAvoidingView
				style={[styles.container, { justifyContent: 'center' }]}
				behavior="padding"
				enabled
			>
				<Text style={styles.h4}>Changez votre mot de passe</Text>
				<Text
					style={[
						styles.text,
						styles.paddingV10,
						styles.w100,
						styles.textCenter
					]}
				>
					Veuillez confirmer votre numéro de téléphone en renseignant le code
					que vous avez reçu par SMS et un nouveau mot de passe.
				</Text>
				<TextInput
					style={styles.input}
					placeholder="Code à 4 chiffres"
					keyboardType="numeric"
					maxLength={4}
					onChangeText={value => {
						this.props.handleChange('smsCodeUser', value);
					}}
					value={this.props.smsCodeUser}
				/>
				<Text style={[styles.error]}>
					{this.state.errors.sms === true ? 'Code invalide' : ''}
				</Text>

				<TextInput
					style={styles.input}
					placeholder="Mot de passe"
					secureTextEntry={true}
					onChangeText={value => {
						this.props.handleChange('newPassword', value);
					}}
					value={this.props.newPassword}
				/>
				<Text style={[styles.error]}>
					{this.state.errors.newPassword === true
						? "Mot de passe d'au moins 8 caractères requis"
						: ''}
				</Text>

				<TouchableOpacity
					onPress={this.send}
					style={[
						styles.button,
						styles.primaryButtonColor,
						styles.marginV10,
						styles.w100
					]}
				>
					<Text style={[styles.textCenter, styles.textWhite]}>
						Changer mon mot de passe
					</Text>
				</TouchableOpacity>
				<TouchableOpacity
					onPress={this.back}
					style={[styles.button, styles.secondaryButtonColor, styles.w100]}
				>
					<Text style={[styles.textCenter, styles.textWhite]}>Précédent</Text>
				</TouchableOpacity>
			</KeyboardAvoidingView>
		);
	}
}

/*
const customStyles = StyleSheet.create({
	customCSS: {}
});
*/

export default ChangePassword;
