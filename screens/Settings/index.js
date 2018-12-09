import React from 'react';
import axios from 'axios';
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

	// Update my settings
	update = () => {
		const { username, phoneNumber, email, password } = this.state;
		axios
			.put(
				'https://human-challenge-back-end.herokuapp.com/api/settings/update/ID',
				{
					account: {
						username: username,
						phoneNumber: phoneNumber,
						email: email,
						password: password
					}
				}
			)
			.then(response => {
				console.log(response);
			})
			.catch(error => {
				console.log(error);
			});
	};

	// Log out
	logout = () => {};

	// Delete my account
	delete = () => {
		axios
			.delete(
				'https://human-challenge-back-end.herokuapp.com/api/settings/remove/ID'
			)
			.then(response => {
				console.log(response);
			})
			.catch(error => {
				console.log(error);
			});
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
						this.handleChange('phoneNumber', value);
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
						this.handleChange('password', value);
					}}
					value={password}
				/>

				<Text style={[styles.h4, styles.marginTop30]}>Mon profil</Text>

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
					onPress={() => this.update()}
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
						onPress={() => this.logout()}
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
						onPress={() => this.delete()}
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

	componentDidMount() {
		axios
			.get('https://human-challenge-back-end.herokuapp.com/api/settings/ID')
			.then(response => {
				console.log(response);
				this.setState({
					phoneNumber: response.account.phoneNumber,
					email: response.account.email,
					password: response.account.password,
					username: response.account.username
				});
			})
			.catch(error => {
				console.log(error);
			});
	}
}

const customStyles = StyleSheet.create({
	custom: {
		width: Dimensions.get('window').width / 2 - 40,
		alignItems: 'center'
	}
});

export default Settings;
