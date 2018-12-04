import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

class ChallengesList extends React.Component {
	render() {
		return (
			<View style={styles.container}>
				<Text>This is the ChallengesList screen</Text>
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

export default ChallengesList;
