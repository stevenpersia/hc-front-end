import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import styles from '../../Styles';

class Login extends React.Component {
	render() {
		return (
			<View style={styles.container}>
				<Text>This is the Login screen</Text>
			</View>
		);
	}
}

/*
const customStyles = StyleSheet.create({
	customCSS: {}
});
*/

export default Login;
