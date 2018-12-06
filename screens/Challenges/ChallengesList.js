import React from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import styles from "../../Styles";
import ChallengeCard from "../../components/ChallengeCard";
import axios from "axios";

class ChallengesList extends React.Component {
	_keyExtractor = (item, index) => item._id;

	state = {};

	getChallenges() {
		axios
			.get(
				"https://human-challenge-back-end.herokuapp.com/api/challenge?distance=300000000&category=environnement"
			)
			.then(response => {
				this.setState(response.data, () => {
					// console.log(this.state);
				});
			});
	}

	componentDidMount() {
		this.getChallenges();
	}

	render() {
		return (
			<View style={styles.container}>
				<Text>This is the ChallengesList screen</Text>
				<FlatList
					data={this.state.Challenges}
					keyExtractor={this._keyExtractor}
					renderItem={({ item }) => (
						// <Image
						// 	style={{ height: 200, width: 200 }}
						// 	source={{
						// 		uri: item.photos[0]
						// 	}}
						// />
						<ChallengeCard id={item._id} challenge={item} />
					)}
				/>
			</View>
		);
	}
}

/*
const customStyles = StyleSheet.create({
	customCSS: {}
});
*/

export default ChallengesList;
