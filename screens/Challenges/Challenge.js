import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

class Challenge extends React.Component {
	render() {
		return (
			<View style={styles.container}>
				<Text>This is the Challenge screen</Text>
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

export default Challenge;
