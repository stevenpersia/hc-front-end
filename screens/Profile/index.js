import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import styles from '../../Styles';

class Profile extends React.Component {
	render() {
		return (
			<View style={styles.container}>
				<Text>This is the Profile screen</Text>
			</View>
		);
	}
}

/*
const customStyles = StyleSheet.create({
	customCSS: {}
});
*/

export default Profile;
