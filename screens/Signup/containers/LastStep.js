import React from 'react';
import {
	TextInput,
	Text,
	View,
	TouchableOpacity,
	Switch,
	KeyboardAvoidingView
} from 'react-native';
import styles from '../../../Styles';

class LastStep extends React.Component {
	back = e => {
		e.preventDefault();
		this.props.prevStep();
	};

	render() {
		return (
			<KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
				<Text style={styles.h4}>Dernière étape</Text>
				<Text style={[styles.text, styles.paddingV10]}>
					Veuillez compléter votre profil.
				</Text>
				<TextInput
					style={styles.input}
					placeholder="Adresse email"
					keyboardType="email-address"
				/>
				<Switch />
				<TouchableOpacity
					onPress={this.back}
					style={[styles.button, styles.secondaryButtonColor, styles.marginV10]}
				>
					<Text style={[styles.textCenter, styles.textWhite]}>Précédent</Text>
				</TouchableOpacity>
			</KeyboardAvoidingView>
		);
	}
}

/*
const customStyles = StyleSheet.create({
	customCSS: {}
});
*/

export default LastStep;
