import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

class Profile extends React.Component {
	render() {
		return (
			<View style={styles.container}>
				<Text>This is the Profile screen</Text>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center'
	}
});

export default Profile;
