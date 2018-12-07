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
	ScrollView
} from 'react-native';
import styles from '../../../Styles';
import { ImagePicker, Camera, Permissions } from 'expo';
import { Entypo } from '@expo/vector-icons';

class LastStep extends React.Component {
	state = {
		image: null,
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
			<KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
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
							styles.margin10,
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
							styles.margin10,
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
				<TextInput
					style={styles.input}
					placeholder="Adresse email"
					keyboardType="email-address"
					onChangeText={value => {
						this.props.handleChange('email', value);
					}}
					value={email}
				/>

				<TouchableOpacity
					onPress={this.props.register}
					style={[
						styles.button,
						styles.primaryButtonColor,
						styles.marginV10,
						customStyles.w100
					]}
				>
					<Text style={[styles.textCenter, styles.textWhite]}>Inscription</Text>
				</TouchableOpacity>
			</KeyboardAvoidingView>
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
		top: 120,
		left: 48
	},
	camera: { width: 150, height: 190 },
	viewCamera: {
		width: 150,
		overflow: 'hidden',
		height: 150,
		borderRadius: 150
	},
	image: {
		width: 150,
		height: 150,
		borderRadius: 150
	}
});

export default LastStep;
