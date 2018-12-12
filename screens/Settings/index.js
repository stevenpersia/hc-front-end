import React from 'react';
import axios from 'axios';
import {
	Text,
	TouchableOpacity,
	TextInput,
	KeyboardAvoidingView,
	View,
	ScrollView,
	StyleSheet,
	Dimensions,
	Image
} from 'react-native';
import styles from '../../Styles';
import { ImagePicker, Camera, Permissions } from 'expo';
import { Entypo } from '@expo/vector-icons';

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
		},
		image: 'WOW',
		hasCameraPermission: null,
		showCamera: false,
		avatar: ''
	};

	async componentWillMount() {
		const { status } = await Permissions.askAsync(Permissions.CAMERA);
		this.setState({ hasCameraPermission: status === 'granted' });
	}

	// Add input changes to state
	handleChange = (key, value) => {
		this.setState({ [key]: value });
	};

	renderPicture = () => {
		let { image, showCamera } = this.state;

		if (showCamera === true) {
			return (
				<View>
					<View style={customStyles.viewCamera}>
						<Camera
							style={customStyles.camera}
							type={Camera.Constants.Type.front}
							ref={ref => {
								this.camera = ref;
							}}
						/>
					</View>

					<TouchableOpacity onPress={this.snap} style={customStyles.snap}>
						<Entypo name="fingerprint" size={34} color="#FFFFFF" />
					</TouchableOpacity>
				</View>
			);
		} else {
			return (
				<View>
					<Image
						// Add component of Tovo (inital name) if there is no image
						source={{ uri: image || image }}
						style={customStyles.image}
					/>
				</View>
			);
		}
	};

	// Add avatar image to state
	handleAvatar = value => {
		this.setState({
			avatar: 'data:image/jpg;base64,' + value
		});
	};

	// Update my settings
	update = () => {
		const { username, phoneNumber, email, password, avatar } = this.state;
		axios
			.put(
				'https://human-challenge-back-end.herokuapp.com/api/settings/update/5c11228a5bc6600016c06192',
				{
					account: {
						username: username,
						phoneNumber: phoneNumber,
						email: email
					},
					security: {
						password: password
					},
					files: [avatar],
					challenges: {
						player: [],
						manager: []
					}
				},
				{
					headers: {
						Authorization:
							'WgZNIDDBXk7kl97wzkNSWEKrvQ9MfOcOyMlsLzq1ShOHslvTqw5niR5amQciFxSv'
					}
				}
			)
			.then(response => {
				console.log(response.data);
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
				'https://human-challenge-back-end.herokuapp.com/api/settings/remove/5c11228a5bc6600016c06192',
				{
					headers: {
						Authorization:
							'WgZNIDDBXk7kl97wzkNSWEKrvQ9MfOcOyMlsLzq1ShOHslvTqw5niR5amQciFxSv'
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
						{this.renderPicture()}
						<View
							style={{
								flexDirection: 'row',
								paddingTop: 30
							}}
						>
							<TouchableOpacity
								onPress={this._pickImage}
								style={[
									styles.bgGray,
									styles.padding10,
									styles.marginTop10,
									styles.marginH10,
									{ borderRadius: 5 }
								]}
							>
								<Entypo
									name="images"
									size={32}
									color="black"
									style={styles.textCenter}
								/>
								<Text style={styles.textCenter}>Choisir une photo</Text>
							</TouchableOpacity>

							<TouchableOpacity
								onPress={() => {
									this.setState({
										showCamera: true
									});
								}}
								style={[
									styles.bgGray,
									styles.padding10,
									styles.marginTop10,
									styles.marginH10,
									{ borderRadius: 5 }
								]}
							>
								<Entypo
									name="camera"
									size={32}
									color="black"
									style={styles.textCenter}
								/>

								<Text style={styles.textCenter}>Prendre une photo</Text>
							</TouchableOpacity>
						</View>

						<Text style={[{ color: 'red' }]}>
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
				'https://human-challenge-back-end.herokuapp.com/api/settings/5c11228a5bc6600016c06192',
				{
					headers: {
						Authorization:
							'WgZNIDDBXk7kl97wzkNSWEKrvQ9MfOcOyMlsLzq1ShOHslvTqw5niR5amQciFxSv'
					}
				}
			)
			.then(response => {
				console.log(response.data);

				if (response.data.user.account.avatar.length > 0) {
					this.setState({
						phoneNumber: response.data.user.account.phoneNumber,
						email: response.data.user.account.email,
						username: response.data.user.account.username,
						image: response.data.user.account.avatar[0].url,
						avatar: response.data.user.account.avatar[0].url
					});
				} else {
					this.setState({
						phoneNumber: response.data.user.account.phoneNumber,
						email: response.data.user.account.email,
						username: response.data.user.account.username
					});
				}
			})
			.catch(error => {
				console.log(error);
			});
	}

	_pickImage = async () => {
		let result = await ImagePicker.launchImageLibraryAsync({
			allowsEditing: true,
			aspect: [4, 4],
			base64: true
		});
		this.handleAvatar(result.base64);
		this.setState({ image: result.uri, showCamera: false });
	};

	snap = async () => {
		let result = await this.camera.takePictureAsync({
			base64: true
		});
		this.handleAvatar(result.base64);

		this.setState({
			image: result.uri,
			showCamera: false
		});
	};
}

const customStyles = StyleSheet.create({
	w100: { width: Dimensions.get('window').width - 60 },
	snap: {
		backgroundColor: '#000',
		width: 55,
		height: 55,
		borderRadius: 55,
		borderColor: '#FFF',
		borderWidth: 5,
		position: 'absolute',
		padding: 5,
		top: 140,
		left: 48
	},
	camera: { width: 150, height: 190 },
	viewCamera: {
		width: 150,
		overflow: 'hidden',
		height: 150,
		borderRadius: 75,
		marginTop: 20
	},
	image: {
		width: 150,
		height: 150,
		borderRadius: 75,
		marginTop: 20
	}
});

export default Settings;
