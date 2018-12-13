import React from 'react';
import {
	Text,
	View,
	TouchableOpacity,
	StyleSheet,
	Dimensions,
	ImageBackground
} from 'react-native';
import styles from '../../../Styles';

class ConfirmPhoneNumber extends React.Component {
	back = e => {
		e.preventDefault();
		this.props.prevStep();
	};

	next = e => {
		e.preventDefault();
		this.props.handleSmsCodeSend();
		this.props.nextStep();
	};

	render() {
		const { phoneNumber } = this.props;
		return (
			<ImageBackground
				source={require('../../../assets/images/bg/06.jpg')}
				style={[styles.fullW, styles.fullH, { flex: 1, resizeMode: 'cover' }]}
			>
				<View style={[styles.container, { justifyContent: 'center' }]}>
					<Text
						style={[
							styles.h4,
							styles.textCenter,
							styles.paddingH30,
							styles.textBlack
						]}
					>
						Confirmez votre numéro de téléphone
					</Text>
					<Text style={[styles.h5, styles.paddingTop30, styles.textBlack]}>
						{phoneNumber}
					</Text>
					<Text
						style={[
							styles.text,
							styles.padding30,
							styles.textCenter,
							styles.textBlack
						]}
					>
						En appuyant sur le bouton 'Envoyer le code de confirmation'
						ci-dessous, vous recevrez un SMS pour confirmer votre numéro de
						téléphone.
					</Text>
					<TouchableOpacity
						onPress={this.next}
						style={[customStyles.button, styles.marginV10, styles.w100]}
					>
						<Text style={[styles.textCenter, styles.textWhite]}>
							Envoyer le code de confirmation
						</Text>
					</TouchableOpacity>
					<TouchableOpacity
						onPress={this.back}
						style={[customStyles.buttonSecondary, styles.w100]}
					>
						<Text style={[styles.textCenter, styles.textBlack]}>Précédent</Text>
					</TouchableOpacity>
				</View>
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

export default ConfirmPhoneNumber;
