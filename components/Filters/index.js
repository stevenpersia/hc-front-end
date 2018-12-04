import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

class Filters extends React.Component {
	render() {
		return (
			<View style={styles.container}>
				<Text>This is the Filters component</Text>
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

export default Filters;
