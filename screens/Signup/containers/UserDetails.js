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

class UserDetails extends React.Component {
	state = {
		errors: {
			username: false,
			phoneNumber: false,
			password: false
		}
	};
	next = e => {
		const { password, phoneNumber, username } = this.props;
		e.preventDefault();

		// Check all validations before to go to next step
		if (
			username &&
			username.length > 0 &&
			phoneNumber &&
			phoneNumber.length === 10 &&
			password &&
			password.length >= 8
		) {
			this.props.nextStep();
		} else {
			const usernameValidation = username.length === 0 ? true : false;
			const phoneNumberValidation = phoneNumber.length < 10 ? true : false;
			const passwordValidation = password.length < 8 ? true : false;

			this.setState({
				errors: {
					username: usernameValidation,
					phoneNumber: phoneNumberValidation,
					password: passwordValidation
				}
			});
		}
	};

	render() {
		const { username, phoneNumber, password } = this.props;
		return (
			<KeyboardAvoidingView
				style={[styles.container, { justifyContent: 'center' }]}
				behavior="padding"
				enabled
			>
				<Text style={styles.h4}>Inscription</Text>
				<TextInput
					style={styles.input}
					placeholder="Pseudo"
					onChangeText={value => {
						this.props.handleChange('username', value);
					}}
					value={username}
				/>
				<Text style={[styles.error]}>
					{this.state.errors.username === true ? 'Pseudo requis' : ''}
				</Text>
				<TextInput
					style={styles.input}
					placeholder="Téléphone"
					keyboardType="numeric"
					maxLength={10}
					onChangeText={value => {
						this.props.handleChange('phoneNumber', value);
					}}
					value={phoneNumber}
				/>
				<Text style={[styles.error]}>
					{this.state.errors.phoneNumber === true ? 'Numéro valide requis' : ''}
				</Text>
				<TextInput
					style={styles.input}
					placeholder="Mot de passe"
					secureTextEntry={true}
					onChangeText={value => {
						this.props.handleChange('password', value);
					}}
					value={password}
				/>
				<Text style={[styles.error]}>
					{this.state.errors.password === true
						? "Mot de passe d'au moins 8 caractères requis"
						: ''}
				</Text>
				<TouchableOpacity
					onPress={this.next}
					style={[
						styles.button,
						styles.primaryButtonColor,
						styles.marginV10,
						customStyles.w100
					]}
				>
					<Text style={[styles.textCenter, styles.textWhite]}>Suivant</Text>
				</TouchableOpacity>
			</KeyboardAvoidingView>
		);
	}
}

const customStyles = StyleSheet.create({
	w100: { width: Dimensions.get('window').width - 60 }
});

export default UserDetails;
