import React from 'react';
import {
	Text,
	TouchableOpacity,
	TextInput,
	KeyboardAvoidingView,
	StyleSheet,
	Dimensions,
	View
} from 'react-native';
import styles from '../../Styles';

class Settings extends React.Component {
	state = {
		phoneNumber: '',
		email: '',
		password: '',
		firstName: '',
		lastName: '',
		username: '',
		interest: [],
		categories: []
	};

	// Add input changes to state
	handleChange = (key, value) => {
		this.setState({ [key]: value });
	};

	render() {
		const {
			email,
			phoneNumber,
			password,
			firstName,
			lastName,
			username
		} = this.props;

		return (
			<KeyboardAvoidingView
				style={[styles.container, { justifyContent: 'center' }]}
				behavior="padding"
				enabled
			>
				<Text style={styles.h4}>Mon compte</Text>

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

				<TextInput
					style={styles.input}
					placeholder="Adresse email"
					keyboardType="email-address"
					onChangeText={value => {
						this.handleChange('email', value);
					}}
					value={email}
				/>

				<TextInput
					style={styles.input}
					placeholder="Mot de passe"
					secureTextEntry={true}
					onChangeText={value => {
						this.props.handleChange('password', value);
					}}
					value={password}
				/>

				<Text style={styles.h4}>Mon profil</Text>

				<TextInput
					style={styles.input}
					placeholder="Prénom"
					onChangeText={value => {
						this.handleChange('firstName', value);
					}}
					value={firstName}
				/>

				<TextInput
					style={styles.input}
					placeholder="Nom"
					onChangeText={value => {
						this.handleChange('lastName', value);
					}}
					value={lastName}
				/>

				<TextInput
					style={styles.input}
					placeholder="Pseudo"
					onChangeText={value => {
						this.handleChange('username', value);
					}}
					value={username}
				/>

				<TouchableOpacity
					style={[
						styles.button,
						styles.primaryButtonColor,
						styles.marginV10,
						styles.w100
					]}
				>
					<Text style={[styles.textCenter, styles.textWhite]}>Enregistrer</Text>
				</TouchableOpacity>
				<View style={{ flexDirection: 'row' }}>
					<TouchableOpacity
						style={[
							styles.button,
							styles.secondaryButtonColor,
							styles.margin10,
							customStyles.custom
						]}
					>
						<Text style={[styles.textCenter, styles.textWhite]}>
							Se déconnecter
						</Text>
					</TouchableOpacity>

					<TouchableOpacity
						style={[
							styles.button,
							styles.secondaryButtonColor,
							styles.margin10,
							customStyles.custom
						]}
					>
						<Text style={[styles.textCenter, styles.textWhite]}>
							Supprimer son compte
						</Text>
					</TouchableOpacity>
				</View>
			</KeyboardAvoidingView>
		);
	}
}

const customStyles = StyleSheet.create({
	custom: {
		width: Dimensions.get('window').width / 2 - 40,
		alignItems: 'center'
	}
});

export default Settings;
