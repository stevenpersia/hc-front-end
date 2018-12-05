import React from 'react';
import {
	Text,
	TouchableOpacity,
	TextInput,
	KeyboardAvoidingView
} from 'react-native';
import styles from '../../../Styles';

class UserDetails extends React.Component {
	next = e => {
		e.preventDefault();
		this.props.nextStep();
	};

	render() {
		const { username, phoneNumber, password } = this.props;
		return (
			<KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
				<TextInput
					style={styles.input}
					placeholder="Pseudo"
					onChangeText={value => {
						this.props.handleChange('username', value);
					}}
					value={username}
					autoFocus={true}
				/>
				<TextInput
					style={styles.input}
					placeholder="Téléphone"
					keyboardType="numeric"
					maxLength={10}
					onChangeText={value => {
						this.props.handleChange('phoneNumber', value);
					}}
					value={phoneNumber}
				/>
				<TextInput
					style={styles.input}
					placeholder="Mot de passe"
					secureTextEntry={true}
					onChangeText={value => {
						this.props.handleChange('password', value);
					}}
					value={password}
				/>
				<TouchableOpacity
					onPress={this.next}
					style={[styles.button, styles.primaryButtonColor, styles.marginV10]}
				>
					<Text style={[styles.textCenter, styles.textWhite]}>Suivant</Text>
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

export default UserDetails;
