import React from 'react';
import {
	TouchableOpacity,
	Text,
	TextInput,
	KeyboardAvoidingView,
	ImageBackground,
	View,
	Dimensions,
	StyleSheet
} from 'react-native';
import styles from '../../../Styles';

class PhoneNumber extends React.Component {
	state = {
		error: false
	};

	next = e => {
		e.preventDefault();
		if (this.props.phoneNumber && this.props.phoneNumber.length === 10) {
			this.props.handleSmsCodeSend();
			this.props.nextStep();
		} else {
			this.setState({
				error: true
			});
		}
	};

	render() {
		return (
			<ImageBackground
				source={require('../../../assets/images/bg/02.jpg')}
				style={[styles.fullW, styles.fullH, { flex: 1, resizeMode: 'cover' }]}
			>
				<KeyboardAvoidingView
					style={[styles.container, { justifyContent: 'center' }]}
					behavior="padding"
					enabled
				>
					<Text style={[styles.h4, { color: '#1d262a' }]}>
						Mot de passe oublié ?
					</Text>
					<Text
						style={[
							styles.text,
							styles.paddingV10,
							styles.w100,
							styles.textCenter,
							styles.textBlack
						]}
					>
						Veuillez entrer votre numéro de téléphone.
					</Text>
					<TextInput
						style={customStyles.input}
						placeholder="Téléphone"
						placeholderTextColor="#1d262a"
						keyboardType="numeric"
						maxLength={10}
						onChangeText={value => {
							this.props.handleChange('phoneNumber', value);
						}}
						value={this.props.phoneNumber}
					/>
					<Text>{this.state.error === true ? 'Téléphone invalide' : ''}</Text>
					<Text
						style={[
							styles.text,
							styles.paddingBottom30,
							styles.paddingTop10,
							styles.paddingH30,
							styles.textCenter,
							styles.textBlack
						]}
					>
						En appuyant sur le bouton 'Recevoir le code par SMS' ci-dessous,
						vous recevrez un SMS pour confirmer votre numéro de téléphone.
					</Text>
					<TouchableOpacity
						onPress={this.next}
						style={[customStyles.button, styles.marginV10, styles.w100]}
					>
						<Text style={[styles.textCenter, styles.textWhite]}>
							Recevoir le code par SMS
						</Text>
					</TouchableOpacity>
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

export default PhoneNumber;
