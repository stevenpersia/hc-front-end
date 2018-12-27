import React from 'react';
import {
	Text,
	TouchableOpacity,
	TextInput,
	KeyboardAvoidingView,
	ImageBackground,
	View,
	Dimensions,
	StyleSheet
} from 'react-native';
import styles from '../../Styles';
import axios from 'axios';
import { AsyncStorage } from 'react-native';
import { DrawerActions } from 'react-navigation-drawer';
import { Entypo } from '@expo/vector-icons';

class Login extends React.Component {
	static navigationOptions = {
		header: null
	};

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
				AsyncStorage.setItem('id', response.data._id);
				AsyncStorage.setItem('token', response.data.security.token);
				this.props.navigation.navigate('ChallengesList');
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
			<ImageBackground
				source={require('../../assets/images/bg/02.jpg')}
				style={[styles.fullW, styles.fullH, { flex: 1, resizeMode: 'cover' }]}
			>
				<TouchableOpacity
					onPress={() =>
						this.props.navigation.dispatch(DrawerActions.toggleDrawer())
					}
					style={{ paddingTop: 20, paddingLeft: 20, width: 50 }}
				>
					<Entypo name="list" size={30} color="black" />
				</TouchableOpacity>
				<KeyboardAvoidingView
					style={[styles.container, { justifyContent: 'center' }]}
					behavior="padding"
					enabled
				>
					<View style={[styles.padding30, styles.margin30]}>
						<Text
							style={[
								styles.h4,
								styles.textCenter,
								styles.paddingV30,
								styles.textBlack
							]}
						>
							Se connecter
						</Text>
						<TextInput
							style={customStyles.input}
							placeholder="Téléphone"
							placeholderTextColor="#1d262a"
							keyboardType="numeric"
							maxLength={10}
							onChangeText={value => {
								this.handleChange('phoneNumber', value);
							}}
							value={phoneNumber}
						/>
						<TextInput
							style={customStyles.input}
							placeholder="Mot de passe"
							placeholderTextColor="#1d262a"
							secureTextEntry={true}
							onChangeText={value => {
								this.handleChange('password', value);
							}}
							value={password}
						/>
						<Text style={[styles.textCenter]}>
							{this.state.error === true
								? 'Téléphone / Mot de passe invalide'
								: ''}
						</Text>
						<TouchableOpacity
							onPress={this.login}
							style={[customStyles.button, styles.marginV10]}
						>
							<Text style={[styles.textCenter, styles.textWhite]}>
								Se connecter
							</Text>
						</TouchableOpacity>

						<TouchableOpacity
							onPress={() => this.props.navigation.navigate('ForgotPassword')}
							style={[customStyles.buttonThird]}
						>
							<Text style={[styles.textCenter, styles.textBlack]}>
								Mot de passe oublié ?
							</Text>
						</TouchableOpacity>
						<TouchableOpacity
							onPress={() => this.props.navigation.navigate('Signup')}
							style={[customStyles.buttonThird, styles.marginV10, styles.w100]}
						>
							<Text style={[styles.textCenter]}>S'inscrire</Text>
						</TouchableOpacity>
					</View>
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
		margin: 10
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
		backgroundColor: '#FFF',
		paddingVertical: 15,
		paddingHorizontal: 30,
		borderRadius: 3,
		margin: 10,
		width: Dimensions.get('window').width - 60
	},
	buttonThird: {
		paddingVertical: 15,
		paddingHorizontal: 30,
		borderRadius: 3,
		margin: 10,
		borderWidth: 1,
		borderColor: '#1d262a',
		width: Dimensions.get('window').width - 60
	}
});

export default Login;
