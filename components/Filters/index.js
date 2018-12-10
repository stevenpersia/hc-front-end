import React from "react";
import { StyleSheet, Text, View, TouchableHighlight } from "react-native";
import styles from "../../Styles";
import { Entypo } from "@expo/vector-icons";
import ChallengeCardCategory from "../ChallengeCardCategory";
class Filters extends React.Component {
	render() {
		return (
			<View
				style={{
					flex: 1,
					justifyContent: "space-evenly",
					alignItems: "center"
				}}
			>
				<View>
					<Text style={[styles.h4, styles.textGray, styles.textCenter]}>
						Catégorie
					</Text>
					<View
						style={{
							flexDirection: "row",
							height: 80,
							width: "100%",
							justifyContent: "space-evenly",
							alignItems: "center"
						}}
					>
						<ChallengeCardCategory
							type="Environnement"
							color="green"
							sizeFont="50"
						/>
						<ChallengeCardCategory type="Social" color="red" sizeFont="50" />
						<ChallengeCardCategory
							type="Animaux"
							color="yellow"
							sizeFont="50"
						/>
						<ChallengeCardCategory type="Culture" color="blue" sizeFont="50" />
					</View>
				</View>
				<View>
					<Text style={[styles.h4, styles.textGray]}>Localisation</Text>
				</View>
				<View>
					<Text style={[styles.h4, styles.textGray]}>Durée</Text>
				</View>
				<View>
					<Text style={[styles.h4, styles.textGray]}>Date</Text>
				</View>
			</View>
		);
	}
}

/*
const styles = StyleSheet.create({
	customCSS: {}
});
*/

export default Filters;
