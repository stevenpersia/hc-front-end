import React from 'react';
import {
	Text,
	View,
	TouchableOpacity,
	StyleSheet,
	Dimensions
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
			<View style={[styles.container, { justifyContent: 'center' }]}>
				<Text style={[styles.h4, styles.textCenter, styles.paddingH30]}>
					Confirmez votre numéro de téléphone
				</Text>
				<Text style={[styles.h5, styles.paddingTop30]}>{phoneNumber}</Text>
				<Text style={[styles.text, styles.padding30, styles.textCenter]}>
					En appuyant sur le bouton 'Envoyer le code de confirmation'
					ci-dessous, vous recevrez un SMS pour confirmer votre numéro de
					téléphone.
				</Text>
				<TouchableOpacity
					onPress={this.next}
					style={[
						styles.button,
						styles.primaryButtonColor,
						styles.marginV10,
						customStyles.w100
					]}
				>
					<Text style={[styles.textCenter, styles.textWhite]}>
						Envoyer le code de confirmation
					</Text>
				</TouchableOpacity>
				<TouchableOpacity
					onPress={this.back}
					style={[
						styles.button,
						styles.secondaryButtonColor,
						customStyles.w100
					]}
				>
					<Text style={[styles.textCenter, styles.textWhite]}>Précédent</Text>
				</TouchableOpacity>
			</View>
		);
	}
}

const customStyles = StyleSheet.create({
	w100: { width: Dimensions.get('window').width - 60 }
});

export default ConfirmPhoneNumber;
