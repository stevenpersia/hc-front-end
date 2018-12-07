import React from 'react';
import {
	Text,
	TouchableOpacity,
	TextInput,
	KeyboardAvoidingView
} from 'react-native';
import styles from '../../Styles';
import axios from 'axios';

class Login extends React.Component {
	state = {
		phoneNumber: '',
		password: '',
		error: false
	};

	// Add input changes to state
	handleChange = (key, value) => {
		this.setState({ [key]: value });
	};

	// Login action
	login = () => {
		const { phoneNumber, password } = this.state;
		axios
			.post('https://human-challenge-back-end.herokuapp.com/api/login/', {
				account: {
					phoneNumber,
					password
				}
			})
			.then(response => {
				this.props.navigation.navigate('ChallengesMap');
			})
			.catch(error => {
				console.log(error);

				this.setState({
					error: true
				});
			});
	};

	render() {
		const { phoneNumber, password } = this.state;
		return (
			<KeyboardAvoidingView
				style={[styles.container, { justifyContent: 'center' }]}
				behavior="padding"
				enabled
			>
				<Text style={styles.h4}>Se connecter</Text>
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
					placeholder="Mot de passe"
					secureTextEntry={true}
					onChangeText={value => {
						this.handleChange('password', value);
					}}
					value={password}
				/>
				<Text style={[styles.error]}>
					{this.state.error === true ? 'Téléphone / Mot de passe invalide' : ''}
				</Text>
				<TouchableOpacity
					onPress={this.login}
					style={[
						styles.button,
						styles.primaryButtonColor,
						styles.marginV10,
						styles.w100
					]}
				>
					<Text style={[styles.textCenter, styles.textWhite]}>
						Se connecter
					</Text>
				</TouchableOpacity>
				<TouchableOpacity
					onPress={() => this.props.navigation.navigate('ForgotPassword')}
					style={[styles.button, styles.secondaryButtonColor, styles.w100]}
				>
					<Text style={[styles.textCenter, styles.textWhite]}>
						Mot de passe oublié ?
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

export default Login;
