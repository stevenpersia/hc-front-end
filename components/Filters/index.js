import React from "react";
import {
	StyleSheet,
	Text,
	View,
	TouchableHighlight,
	Dimensions
} from "react-native";
import styles from "../../Styles";
import { Entypo } from "@expo/vector-icons";
import ChallengeCardCategory from "../ChallengeCardCategory";
import MotionSlider from "react-native-motion-slider";
var { height, width } = Dimensions.get("window");
class Filters extends React.Component {
	state = {
		distance: 50,
		Environnement: true,
		Social: true,
		Animaux: true,
		Culture: true,
		half: true,
		day: true,
		more: true
	};

	renderCheckbox(check) {
		if (check === true) {
			return (
				<View
					style={{
						backgroundColor: "white",
						height: 16,
						width: 16,
						borderRadius: 8,
						borderWidth: 1,
						borderColor: "gray"
					}}
				/>
			);
		} else {
			return (
				<View
					style={{
						backgroundColor: "black",
						height: 16,
						width: 16,
						borderRadius: 8,
						borderWidth: 1,
						borderColor: "gray"
					}}
				/>
			);
		}
	}

	render() {
		return (
			<View
				style={{
					flex: 1,
					justifyContent: "space-between",
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
						<TouchableHighlight
							onPress={() => {
								this.setState({ Environnement: !this.state.Environnement });
							}}
							underlayColor="transparent"
						>
							<ChallengeCardCategory
								type="Environnement"
								color={this.state.Environnement ? "green" : "gray"}
								sizeFont="50"
							/>
						</TouchableHighlight>
						<TouchableHighlight
							onPress={() => {
								this.setState({ Social: !this.state.Social });
							}}
							underlayColor="transparent"
						>
							<ChallengeCardCategory
								type="Social"
								color={this.state.Social ? "red" : "gray"}
								sizeFont="50"
							/>
						</TouchableHighlight>
						<TouchableHighlight
							onPress={() => {
								this.setState({ Animaux: !this.state.Animaux });
							}}
							underlayColor="transparent"
						>
							<ChallengeCardCategory
								type="Animaux"
								color={this.state.Animaux ? "yellow" : "gray"}
								sizeFont="50"
							/>
						</TouchableHighlight>
						<TouchableHighlight
							onPress={() => {
								this.setState({ Culture: !this.state.Culture });
							}}
							underlayColor="transparent"
						>
							<ChallengeCardCategory
								type="Culture"
								color={this.state.Culture ? "blue" : "gray"}
								sizeFont="50"
							/>
						</TouchableHighlight>
					</View>
				</View>
				<View style={{ alignItems: "center", justifyContent: "center" }}>
					<Text style={[styles.h4, styles.textGray, styles.textCenter]}>
						Localisation
					</Text>
					<View>
						<MotionSlider
							title={"Sur combien de Km souhaitez-vous faire la recherche"}
							min={1}
							max={150}
							value={50}
							width={width}
							height={40}
							decimalPlaces={0}
							units={"km"}
							borderRadius={20}
							backgroundColor={[
								"rgb(169,169,169)",
								"rgb(128,128,128)",
								"rgb(0,0,0)"
							]}
							onValueChanged={value => this.setState({ distance: value })}
							onPressIn={() => console.log("Pressed in")}
							onPressOut={() => {console.log(this.state.distance, "my man")
						this.props.getFilters({ distance: this.state.distance})
						}}
							onDrag={() => console.log("Dragging")}
						/>
					</View>
				</View>
				<View>
					<Text
						style={[
							styles.h4,
							styles.textGray,
							styles.textCenter,
							styles.marginLeft10
						]}
					>
						Durée
					</Text>
					<View
						style={{
							flexDirection: "row",
							alignItems: "center"
						}}
					>
						<TouchableHighlight
							onPress={() => {
								this.setState({ half: !this.state.half });
							}}
							underlayColor="transparent"
						>
							{this.renderCheckbox(this.state.half)}
						</TouchableHighlight>
						<Text style={[styles.h5, styles.textBlack, styles.marginLeft30]}>
							1/2 Journée
						</Text>
					</View>
					<View
						style={{
							flexDirection: "row",
							alignItems: "center"
						}}
					>
						<TouchableHighlight
							onPress={() => {
								this.setState({ day: !this.state.day });
							}}
							underlayColor="transparent"
						>
							{this.renderCheckbox(this.state.day)}
						</TouchableHighlight>
						<Text style={[styles.h5, styles.textBlack, styles.marginLeft30]}>
							Journée Entière
						</Text>
					</View>
					<View
						style={{
							flexDirection: "row",
							alignItems: "center"
						}}
					>
						<TouchableHighlight
							onPress={() => {
								this.setState({ more: !this.state.more });
							}}
							underlayColor="transparent"
						>
							{this.renderCheckbox(this.state.more)}
						</TouchableHighlight>
						<Text style={[styles.h5, styles.textBlack, styles.marginLeft30]}>
							Plus d'une journée
						</Text>
					</View>
				</View>
				<View>
					<Text style={[styles.h5, styles.textGray]}>Date</Text>
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
