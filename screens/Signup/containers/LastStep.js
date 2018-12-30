import React from 'react';
import {
	TextInput,
	Text,
	TouchableOpacity,
	KeyboardAvoidingView,
	Dimensions,
	Image,
	StyleSheet,
	View,
	ScrollView,
	ImageBackground
} from 'react-native';
import styles from '../../../Styles';
import { ImagePicker, Camera, Permissions } from 'expo';
import { Entypo } from '@expo/vector-icons';

class LastStep extends React.Component {
	state = {
		image: 'WOW',
		hasCameraPermission: null,
		showCamera: false
	};

	back = e => {
		e.preventDefault();
		this.props.prevStep();
	};

	async componentWillMount() {
		const { status } = await Permissions.askAsync(Permissions.CAMERA);
		this.setState({ hasCameraPermission: status === 'granted' });
	}

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

	render() {
		const { email, avatar, interests } = this.props;
		return (
			<ImageBackground
				source={require('../../../assets/images/bg/06.jpg')}
				style={[styles.fullW, styles.fullH, { flex: 1, resizeMode: 'cover' }]}
			>
				<KeyboardAvoidingView
					style={[styles.container, { justifyContent: 'center' }]}
					behavior="padding"
					enabled
				>
					{this.renderPicture()}
					<View
						style={{
							flexDirection: 'row',
							paddingTop: 50
						}}
					>
						<TouchableOpacity
							onPress={this._pickImage}
							style={[
								styles.bgWhite,
								styles.padding10,
								styles.margin10,
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
								styles.margin10,
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
					<TextInput
						style={customStyles.input}
						placeholder="Adresse email"
						placeholderTextColor="#1d262a"
						keyboardType="email-address"
						onChangeText={value => {
							this.props.handleChange('email', value);
						}}
						value={email}
					/>

					<TouchableOpacity
						onPress={this.props.register}
						style={[customStyles.button, styles.marginV10, styles.w100]}
					>
						<Text style={[styles.textCenter, styles.textWhite]}>
							Inscription
						</Text>
					</TouchableOpacity>
				</KeyboardAvoidingView>
			</ImageBackground>
		);
	}
	_pickImage = async () => {
		let result = await ImagePicker.launchImageLibraryAsync({
			allowsEditing: true,
			aspect: [4, 4],
			base64: true
		});
		this.props.handleAvatar(result.base64);
		this.setState({ image: result.uri, showCamera: false });
	};

	snap = async () => {
		let result = await this.camera.takePictureAsync({
			base64: true
		});
		this.props.handleAvatar(result.base64);

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
		top: 120,
		left: 48
	},
	camera: { width: 150, height: 190 },
	viewCamera: {
		width: 150,
		overflow: 'hidden',
		height: 150,
		borderRadius: 75
	},
	image: {
		width: 150,
		height: 150,
		borderRadius: 75,
		borderColor: '#FFF',
		borderWidth: 5,
		backgroundColor: '#1d262a'
	},
	input: {
		backgroundColor: '#FFF',
		borderRadius: 3,
		padding: 15,
		width: Dimensions.get('window').width - 60,
		marginBottom: 10,
		marginTop: 30
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

export default LastStep;
