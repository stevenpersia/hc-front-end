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
	Image,
	ImageBackground
} from 'react-native';
import styles from '../../Styles';
import { ImagePicker, Camera, Permissions } from 'expo';
import { Entypo } from '@expo/vector-icons';
import { AsyncStorage } from 'react-native';
import { DrawerActions } from 'react-navigation-drawer';

class Settings extends React.Component {
	static navigationOptions = {
		header: null
	};

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
		avatar: '',
		auth: {
			id: '',
			token: ''
		}
	};

	async componentWillMount() {
		const { status } = await Permissions.askAsync(Permissions.CAMERA);
		this.setState({ hasCameraPermission: status === 'granted' });
	}

	// Add input changes to state
	handleChange = (key, value) => {
		this.setState({ [key]: value });
	};

	// Render picture
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
				`https://human-challenge-back-end.herokuapp.com/api/settings/update/${
					this.state.auth.id
				}`,
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
						Authorization: this.state.auth.token
					}
				}
			)
			.then(response => {
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
	logout = () => {
		AsyncStorage.multiRemove(['id', 'token'], err => {
			this.setState(
				{
					auth: {
						id: '',
						token: ''
					}
				},
				() => {
					this.props.navigation.navigate('Authentication');
				}
			);
		});
	};

	// Delete my account
	delete = () => {
		AsyncStorage.multiRemove(['id', 'token'], err => {
			axios
				.delete(
					`https://human-challenge-back-end.herokuapp.com/api/settings/remove/${
						this.state.auth.id
					}`,
					{
						headers: {
							Authorization: this.state.auth.token
						}
					}
				)
				.then(response => {
					this.props.navigation.navigate('Authentication');
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
		});
	};

	render() {
		const { email, phoneNumber, password, username } = this.state;
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
				<KeyboardAvoidingView behavior="padding" enabled style={{ flex: 1 }}>
					<ScrollView>
						<View
							style={[
								styles.container,
								{ justifyContent: 'center', marginTop: 30 }
							]}
						>
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
										styles.bgWhite,
										styles.padding10,
										styles.marginTop10,
										styles.marginH10,
										customStyles.w50,
										{ borderRadius: 5 }
									]}
								>
									<Entypo
										name="images"
										size={32}
										color="#1d262a"
										style={styles.textCenter}
									/>
									<Text style={[styles.textCenter, styles.blackColor]}>
										Choisir une photo
									</Text>
								</TouchableOpacity>

								<TouchableOpacity
									onPress={() => {
										this.setState({
											showCamera: true
										});
									}}
									style={[
										styles.bgWhite,
										styles.padding10,
										styles.marginTop10,
										styles.marginH10,
										customStyles.w50,
										{ borderRadius: 5 }
									]}
								>
									<Entypo
										name="camera"
										size={32}
										color="#1d262a"
										style={styles.textCenter}
									/>

									<Text style={[styles.textCenter, styles.blackColor]}>
										Prendre une photo
									</Text>
								</TouchableOpacity>
							</View>

							<Text>
								{this.state.message.error === true
									? 'Une erreur est survenue.'
									: ''}
							</Text>
							<Text>
								{this.state.message.success === true
									? 'Compte mis à jour.'
									: ''}
							</Text>

							<TextInput
								style={customStyles.input}
								placeholder="Pseudo"
								placeholderTextColor="#1d262a"
								onChangeText={value => {
									this.handleChange('username', value);
								}}
								value={username}
							/>

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
								placeholder="Adresse email"
								placeholderTextColor="#1d262a"
								keyboardType="email-address"
								onChangeText={value => {
									this.handleChange('email', value);
								}}
								value={email}
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

							<TouchableOpacity
								onPress={() => this.update()}
								style={[customStyles.button, styles.marginV10, styles.w100]}
							>
								<Text style={[styles.textCenter, styles.textWhite]}>
									Enregistrer
								</Text>
							</TouchableOpacity>
							<TouchableOpacity
								onPress={() => this.logout()}
								style={[
									customStyles.buttonSecondary,
									styles.margin10,
									styles.w100
								]}
							>
								<Text style={[styles.textCenter, styles.blackColor]}>
									Se déconnecter
								</Text>
							</TouchableOpacity>

							<TouchableOpacity
								onPress={() => this.delete()}
								style={[
									customStyles.buttonSecondary,
									styles.margin10,
									styles.w100
								]}
							>
								<Text style={[styles.textCenter, styles.blackColor]}>
									Supprimer son compte
								</Text>
							</TouchableOpacity>
						</View>
					</ScrollView>
				</KeyboardAvoidingView>
			</ImageBackground>
		);
	}

	componentDidMount() {
		AsyncStorage.multiGet(['id', 'token'], (err, stores) => {
			const id = stores[0][1];
			const token = stores[1][1];

			this.setState(
				{
					auth: {
						id,
						token
					}
				},
				() => {
					axios
						.get(
							`https://human-challenge-back-end.herokuapp.com/api/settings/${
								this.state.auth.id
							}`,
							{
								headers: {
									Authorization: this.state.auth.token
								}
							}
						)
						.then(response => {
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
						});
				}
			);
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
	w50: { width: Dimensions.get('window').width / 2 - 40 },
	snap: {
		backgroundColor: '#1d262a',
		width: 55,
		height: 55,
		borderRadius: 55,
		borderColor: '#1d262a',
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
		marginTop: 20,
		borderColor: '#FFF',
		borderWidth: 5,
		backgroundColor: '#1d262a'
	},
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
		paddingVertical: 15,
		paddingHorizontal: 30,
		borderRadius: 3,
		margin: 10,
		borderWidth: 1,
		borderColor: '#1d262a',
		width: Dimensions.get('window').width - 60
	}
});

export default Settings;
