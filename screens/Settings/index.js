import React from 'react';
import axios from 'axios';
import {
	Text,
	TouchableOpacity,
	TextInput,
	KeyboardAvoidingView,
	View,
	ScrollView
} from 'react-native';
import styles from '../../Styles';

class Settings extends React.Component {
	state = {
		phoneNumber: '',
		email: '',
		password: '',
		username: '',
		interest: [],
		categories: [],
		message: {
			error: false,
			success: false
		}
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
				'https://human-challenge-back-end.herokuapp.com/api/settings/update/5c0412b7a380ae141cba4919',
				{
					headers: {
						Authorization:
							'fbCvVAqjvkHYBU83nn613hTqTIeQ7TQIb374DiPUakhfqcOFiPWjLGI0ihDUvZpZ'
					}
				},
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
				this.setState({
					message: {
						error: false,
						success: true
					}
				});
			})
			.catch(error => {
				console.log(error);
				this.setState({
					message: {
						error: true,
						success: false
					}
				});
			});
	};

	// Log out
	logout = () => {};

	// Delete my account
	delete = () => {
		axios
			.delete(
				'https://human-challenge-back-end.herokuapp.com/api/settings/remove/5c0412b7a380ae141cba4919',
				{
					headers: {
						Authorization:
							'fbCvVAqjvkHYBU83nn613hTqTIeQ7TQIb374DiPUakhfqcOFiPWjLGI0ihDUvZpZ'
					}
				}
			)
			.then(response => {
				console.log(response);
				this.props.navigation.navigate('Walkthrough');
			})
			.catch(error => {
				console.log(error);
				this.setState({
					message: {
						error: true,
						success: false
					}
				});
			});
	};

	render() {
		const { email, phoneNumber, password, username } = this.state;

		return (
			<KeyboardAvoidingView behavior="padding" enabled style={{ flex: 1 }}>
				<ScrollView>
					<View
						style={[
							styles.container,
							{ justifyContent: 'center', marginTop: 30 }
						]}
					>
						<Text style={styles.h4}>Mon compte</Text>

						<Text style={[styles.paddingTop10, { color: 'red' }]}>
							{this.state.message.error === true
								? 'Une erreur est survenue.'
								: ''}
						</Text>
						<Text style={{ color: 'green' }}>
							{this.state.message.success === true ? 'Compte mis à jour.' : ''}
						</Text>

						<TextInput
							style={styles.input}
							placeholder="Pseudo"
							onChangeText={value => {
								this.handleChange('username', value);
							}}
							value={username}
						/>

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

						<TouchableOpacity
							onPress={() => this.update()}
							style={[
								styles.button,
								styles.primaryButtonColor,
								styles.marginV10,
								styles.w100
							]}
						>
							<Text style={[styles.textCenter, styles.textWhite]}>
								Enregistrer
							</Text>
						</TouchableOpacity>
						<TouchableOpacity
							onPress={() => this.logout()}
							style={[
								styles.button,
								styles.secondaryButtonColor,
								styles.margin10,
								styles.w100
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
								styles.w100
							]}
						>
							<Text style={[styles.textCenter, styles.textWhite]}>
								Supprimer son compte
							</Text>
						</TouchableOpacity>
					</View>
				</ScrollView>
			</KeyboardAvoidingView>
		);
	}

	componentDidMount() {
		axios
			.get(
				'https://human-challenge-back-end.herokuapp.com/api/settings/5c0412b7a380ae141cba4919',
				{
					headers: {
						Authorization:
							'fbCvVAqjvkHYBU83nn613hTqTIeQ7TQIb374DiPUakhfqcOFiPWjLGI0ihDUvZpZ'
					}
				}
			)
			.then(response => {
				console.log(response);
				this.setState({
					phoneNumber: response.data.user.account.phoneNumber,
					email: response.data.user.account.email,
					username: response.data.user.account.username
				});
			})
			.catch(error => {
				console.log(error);
			});
	}
}

/*
const customStyles = StyleSheet.create({
	custom: {
		width: Dimensions.get('window').width / 2 - 40,
		alignItems: 'center'
	}
});
*/

export default Settings;
