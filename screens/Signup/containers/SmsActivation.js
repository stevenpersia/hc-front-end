import React from 'react';
import {
	Text,
	TouchableOpacity,
	TextInput,
	KeyboardAvoidingView,
	StyleSheet,
	Dimensions
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
			<KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
				<Text style={styles.h4}>Renseignez le code</Text>
				<Text
					style={[
						styles.text,
						styles.paddingV10,
						customStyles.w100,
						styles.textCenter
					]}
				>
					Veuillez confirmer votre numéro de téléphone en renseignant le code
					que vous avez reçu par SMS.
				</Text>
				<TextInput
					style={styles.input}
					placeholder="Code à 4 chiffres"
					keyboardType="numeric"
					maxLength={4}
					onChangeText={value => {
						this.props.handleChange('smsCodeUser', value);
					}}
					value={smsCodeUser}
				/>
				<Text style={[styles.error]}>
					{this.state.errors.sms === true ? 'Code invalide' : ''}
				</Text>

				<TouchableOpacity
					onPress={this.send}
					style={[
						styles.button,
						styles.primaryButtonColor,
						styles.marginV10,
						customStyles.w100
					]}
				>
					<Text style={[styles.textCenter, styles.textWhite]}>
						Confirmer mon code
					</Text>
				</TouchableOpacity>
				<TouchableOpacity
					onPress={this.back}
					style={[
						styles.button,
						styles.secondaryButtonColor,
						customStyles.w100
					]}
				>
					<Text style={[styles.textCenter, styles.textWhite]}>Précédent</Text>
				</TouchableOpacity>
			</KeyboardAvoidingView>
		);
	}
}

const customStyles = StyleSheet.create({
	w100: { width: Dimensions.get('window').width - 60 }
});

export default SmsActivation;
