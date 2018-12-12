import React from 'react';
import {
	TouchableOpacity,
	Text,
	TextInput,
	KeyboardAvoidingView
} from 'react-native';
import styles from '../../../Styles';

class PhoneNumber extends React.Component {
	state = {
		error: false
	};

	next = e => {
		e.preventDefault();
		if (this.props.phoneNumber && this.props.phoneNumber.length === 10) {
			this.props.handleSmsCodeSend();
			this.props.nextStep();
		} else {
			this.setState({
				error: true
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
				<Text style={styles.h4}>Mot de passe oublié ?</Text>
				<Text
					style={[
						styles.text,
						styles.paddingV10,
						styles.w100,
						styles.textCenter
					]}
				>
					Veuillez entrer votre numéro de téléphone.
				</Text>
				<TextInput
					style={styles.input}
					placeholder="Téléphone"
					keyboardType="numeric"
					maxLength={10}
					onChangeText={value => {
						this.props.handleChange('phoneNumber', value);
					}}
					value={this.props.phoneNumber}
				/>
				<Text style={[styles.error]}>
					{this.state.error === true ? 'Téléphone invalide' : ''}
				</Text>
				<Text style={[styles.text, styles.padding30, styles.textCenter]}>
					En appuyant sur le bouton 'Recevoir le code par SMS' ci-dessous, vous
					recevrez un SMS pour confirmer votre numéro de téléphone.
				</Text>
				<TouchableOpacity
					onPress={this.next}
					style={[
						styles.button,
						styles.primaryButtonColor,
						styles.marginV10,
						styles.w100
					]}
				>
					<Text style={[styles.textCenter, styles.textWhite]}>
						Recevoir le code par SMS
					</Text>
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

export default PhoneNumber;
