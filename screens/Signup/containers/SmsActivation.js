import React from 'react';
import {
	Text,
	View,
	TouchableOpacity,
	TextInput,
	KeyboardAvoidingView
} from 'react-native';
import styles from '../../../Styles';

class SmsActivation extends React.Component {
	back = e => {
		e.preventDefault();
		this.props.prevStep();
	};

	saveAndContinue = e => {
		e.preventDefault();
		this.props.nextStep();
	};
	render() {
		return (
			<KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
				<Text style={styles.h4}>Confirmer votre numéro</Text>
				<Text style={[styles.text, styles.paddingV10]}>
					Veuillez confirmer votre numéro de téléphone en renseignant le code
					que vous avez reçu par SMS.
				</Text>
				<TextInput
					style={styles.input}
					placeholder="Code à 4 chiffres"
					keyboardType="numeric"
					maxLength={4}
					autoFocus={true}
				/>
				<View style={{ flexDirection: 'row' }}>
					<TouchableOpacity
						onPress={this.back}
						style={[
							styles.button,
							styles.secondaryButtonColor,
							styles.margin10
						]}
					>
						<Text style={[styles.textCenter, styles.textWhite]}>Précédent</Text>
					</TouchableOpacity>
					<TouchableOpacity
						onPress={this.saveAndContinue}
						style={[styles.button, styles.primaryButtonColor, styles.marginV10]}
					>
						<Text style={[styles.textCenter, styles.textWhite]}>Suivant</Text>
					</TouchableOpacity>
				</View>
			</KeyboardAvoidingView>
		);
	}
}

/*
const customStyles = StyleSheet.create({
	customCSS: {}
});
*/

export default SmsActivation;
