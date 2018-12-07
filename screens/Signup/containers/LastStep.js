import React from 'react';
import {
	TextInput,
	Text,
	TouchableOpacity,
	KeyboardAvoidingView,
	Dimensions,
	Image,
	StyleSheet,
	View
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
					<View
						style={{
							width: 150,
							overflow: 'hidden',
							height: 150,
							borderRadius: 150
						}}
					>
						<Camera
							style={{ width: 150, height: 150 }}
							type={Camera.Constants.Type.front}
							ref={ref => {
								this.camera = ref;
							}}
						/>
					</View>

					<TouchableOpacity onPress={this.snap}>
						<Entypo
							name="controller-record"
							size={36}
							color="red"
							style={{
								borderWidth: 4,
								borderColor: 'black',
								borderRadius: 35,
								width: 36,
								height: 36
							}}
						/>
					</TouchableOpacity>
				</View>
			);
		} else {
			return (
				<View>
					<Image
						source={{ uri: image || image }}
						style={{
							width: 150,
							height: 150,
							borderRadius: 150
						}}
					/>
				</View>
			);
		}
	};

	render() {
		const { email, avatar, interests } = this.props;
		return (
			<KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
				<Text style={styles.h4}>Dernière étape</Text>
				<Text style={[styles.text, styles.paddingV10]}>
					Veuillez compléter votre profil.
				</Text>
				{this.renderPicture()}
				<View
					style={{
						flexDirection: 'row'
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
	w100: { width: Dimensions.get('window').width - 60 }
});

export default LastStep;
