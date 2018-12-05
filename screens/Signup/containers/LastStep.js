import React from 'react';
import {
	TextInput,
	Text,
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
		const { email, avatar, interests } = this.props;
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
					onChangeText={value => {
						this.props.handleChange('email', value);
					}}
					value={email}
				/>
				<Switch />
				<TouchableOpacity
					onPress={this.back}
					style={[styles.button, styles.secondaryButtonColor, styles.marginV10]}
				>
					<Text style={[styles.textCenter, styles.textWhite]}>Précédent</Text>
				</TouchableOpacity>
				<TouchableOpacity
					onPress={this.props.register}
					style={[styles.button, styles.primaryButtonColor, styles.marginV10]}
				>
					<Text style={[styles.textCenter, styles.textWhite]}>Inscription</Text>
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
