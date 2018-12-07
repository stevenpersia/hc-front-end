import React from 'react';
import {
	TouchableOpacity,
	Text,
	View,
	TextInput,
	KeyboardAvoidingView
} from 'react-native';
import styles from '../../Styles';

class ForgotPassword extends React.Component {
	state = {
		phoneNumber: '',
		error: false
	};

	// Add input changes to state
	handleChange = (key, value) => {
		this.setState({ [key]: value });
	};

	askPassword = () => {};

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
					Veuillez entrer votre numéro de téléphone pour recevoir votre mot de
					passe.
				</Text>
				<TextInput
					style={styles.input}
					placeholder="Téléphone"
					keyboardType="numeric"
					maxLength={10}
					onChangeText={value => {
						this.handleChange('phoneNumber', value);
					}}
					value={this.state.phoneNumber}
				/>
				<Text style={[styles.error]}>
					{this.state.error === true ? 'Téléphone invalide' : ''}
				</Text>
				<TouchableOpacity
					onPress={this.askPassword}
					style={[
						styles.button,
						styles.primaryButtonColor,
						styles.marginV10,
						styles.w100
					]}
				>
					<Text style={[styles.textCenter, styles.textWhite]}>
						Recevoir le mot de passe
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

export default ForgotPassword;
