import React from 'react';
import {
	Text,
	TouchableOpacity,
	TextInput,
	KeyboardAvoidingView,
	StyleSheet,
	Dimensions,
	ImageBackground
} from 'react-native';
import styles from '../../../Styles';
import axios from 'axios';

class SmsActivation extends React.Component {
	state = {
		errors: {
			sms: false
		}
	};

	back = e => {
		e.preventDefault();
		this.props.prevStep();
	};

	send = e => {
		const { smsCodeUser, phoneNumber } = this.props;
		e.preventDefault();
		// Check if SMS code is good before to go to next step
		if (smsCodeUser) {
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
		}
	};

	render() {
		const { smsCodeUser } = this.props;
		return (
			<ImageBackground
				source={require('../../../assets/images/bg/06.jpg')}
				style={[styles.fullW, styles.fullH, { flex: 1, resizeMode: 'cover' }]}
			>
				<KeyboardAvoidingView
					style={[styles.container, { justifyContent: 'center' }]}
					behavior="padding"
					enabled
				>
					<Text style={[styles.h4, styles.blackColor]}>Renseignez le code</Text>
					<Text
						style={[
							styles.text,
							styles.paddingV10,
							styles.w100,
							styles.textCenter,
							styles.blackColor
						]}
					>
						Veuillez confirmer votre numéro de téléphone en renseignant le code
						que vous avez reçu par SMS.
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
						value={smsCodeUser}
					/>
					<Text>{this.state.errors.sms === true ? 'Code invalide' : ''}</Text>

					<TouchableOpacity
						onPress={this.send}
						style={[customStyles.button, styles.marginV10, styles.w100]}
					>
						<Text style={[styles.textCenter, styles.textWhite]}>
							Confirmer mon code
						</Text>
					</TouchableOpacity>
					<TouchableOpacity
						onPress={this.back}
						style={[customStyles.buttonSecondary, styles.w100]}
					>
						<Text style={[styles.textCenter, styles.blackColor]}>
							Précédent
						</Text>
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
		marginBottom: 10,
		marginTop: 30
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
	}
});

export default SmsActivation;
