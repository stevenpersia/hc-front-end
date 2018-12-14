import React from "react";
import { Text, View, TouchableHighlight, Dimensions } from "react-native";
import styles from "../../Styles";
import ChallengeCardCategory from "../ChallengeCardCategory";
import MotionSlider from "react-native-motion-slider";
var { width } = Dimensions.get("window");
class Filters extends React.Component {
	state = {
		distance: this.props.distance,
		Environnement: this.props.filterHelpers.Environnement,
		Social: this.props.filterHelpers.Social,
		Animaux: this.props.filterHelpers.Animaux,
		Culture: this.props.filterHelpers.Culture,
		half: this.props.filterHelpers.half,
		day: this.props.filterHelpers.day,
		more: this.props.filterHelpers.more
	};

	renderCheckbox(check) {
		if (check === false) {
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

	getCategoryParam() {
		let response = "";
		this.state.Environnement && (response += "environnement ");
		this.state.Social && (response += "social ");
		this.state.Animaux && (response += "animaux ");
		this.state.Culture && (response += "culture ");
		return response;
	}

	getDurationParam() {
		let response = 0;
		this.state.half && (response += 1);
		this.state.day && (response += 3);
		this.state.more && (response += 5);

		return response;
	}

	getHelpers() {
		return {
			Environnement: this.state.Environnement,
			Social: this.state.Social,
			Animaux: this.state.Animaux,
			Culture: this.state.Culture,
			half: this.state.half,
			day: this.state.day,
			more: this.state.more
		};
	}

	allOfTheparams() {
		console.log(this.props);

		return {
			latitude: this.props.latitude,
			longitude: this.props.longitude,
			distance: this.state.distance,
			duration: this.getDurationParam(),
			category: this.getCategoryParam()
		};
	}

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
					<Text
						style={[
							styles.h4,
							styles.textGray,
							styles.textCenter,
							styles.marginBottom10
						]}
					>
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
								this.setState(
									{ Environnement: !this.state.Environnement },
									() => {
										this.props.getFilters(
											this.allOfTheparams(),
											this.getHelpers()
										);
									}
								);
							}}
							underlayColor="transparent"
						>
							<ChallengeCardCategory
								type="Environnement"
								color={this.state.Environnement ? "#FFBE1A" : "gray"}
								sizeFont="50"
							/>
						</TouchableHighlight>
						<TouchableHighlight
							onPress={() => {
								this.setState({ Social: !this.state.Social }, () => {
									this.props.getFilters(
										this.allOfTheparams(),
										this.getHelpers()
									);
								});
							}}
							underlayColor="transparent"
						>
							<ChallengeCardCategory
								type="Social"
								color={this.state.Social ? "#18DE22" : "gray"}
								sizeFont="50"
							/>
						</TouchableHighlight>
						<TouchableHighlight
							onPress={() => {
								this.setState({ Animaux: !this.state.Animaux }, () => {
									this.props.getFilters(
										this.allOfTheparams(),
										this.getHelpers()
									);
								});
							}}
							underlayColor="transparent"
						>
							<ChallengeCardCategory
								type="Animaux"
								color={this.state.Animaux ? "#7D1AFF" : "gray"}
								sizeFont="50"
							/>
						</TouchableHighlight>
						<TouchableHighlight
							onPress={() => {
								this.setState({ Culture: !this.state.Culture }, () => {
									this.props.getFilters(
										this.allOfTheparams(),
										this.getHelpers()
									);
								});
							}}
							underlayColor="transparent"
						>
							<ChallengeCardCategory
								type="Culture"
								color={this.state.Culture ? "#DF4FFF" : "gray"}
								sizeFont="50"
							/>
						</TouchableHighlight>
					</View>
				</View>
				<View style={{ alignItems: "center", justifyContent: "center" }}>
					<Text
						style={[
							styles.h4,
							styles.textGray,
							styles.textCenter,
							styles.marginBottom10
						]}
					>
						Localisation
					</Text>
					<View>
						<MotionSlider
							title={"Sur combien de Km souhaitez-vous faire la recherche"}
							min={1}
							max={150}
							value={Number(this.props.distance) / 1000}
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
							onValueChanged={value =>
								this.setState({ distance: value * 1000 })
							}
							onPressIn={() => {}}
							onPressOut={() => {
								this.props.getFilters(this.allOfTheparams(), this.getHelpers());
							}}
							onDrag={() => {}}
						/>
					</View>
				</View>
				<View>
					<Text
						style={[
							styles.h4,
							styles.textGray,
							styles.textCenter,

							styles.marginBottom10
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
								this.setState({ half: !this.state.half }, () => {
									this.props.getFilters(
										this.allOfTheparams(),
										this.getHelpers()
									);
								});
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
								this.setState({ day: !this.state.day }, () => {
									this.props.getFilters(
										this.allOfTheparams(),
										this.getHelpers()
									);
								});
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
								this.setState({ more: !this.state.more }, () => {
									this.props.getFilters(
										this.allOfTheparams(),
										this.getHelpers()
									);
								});
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
