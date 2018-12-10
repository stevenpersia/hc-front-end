import React from "react";
import {
	StyleSheet,
	Text,
	View,
	FlatList,
	ActivityIndicator,
	Image,
	TouchableOpacity,
	Dimensions,
	Modal,
	TouchableHighlight
} from "react-native";
import styles from "../../Styles";
import ChallengeCard from "../../components/ChallengeCard";
import axios from "axios";
import ListBar from "../../components/ListBar";
import Filters from "../../components/Filters";
import { Entypo } from "@expo/vector-icons";

class ChallengesList extends React.Component {
	static navigationOptions = {
		header: null
	};

	state = {
		modalVisible: false,
		params: {}
	};

	setModalVisible = visible => {
		this.setState({ modalVisible: visible });
		console.log(this.state);
	};

	_keyExtractor = (item, index) => item._id;

	getChallenges() {
		axios
			.get("http://human-challenge-back-end.herokuapp.com/api/challenge", {
				params: this.state.params
			})
			.then(response => {
				this.setState(response.data, () => {
					console.log(this.state);
				});
			});
	}

	getFilters = filters => {
		this.setState({ params: filters }, () => {
			this.getChallenges();
		});
	};

	renderFilters() {
		return (
			<Modal
				animationType="slide"
				transparent={false}
				visible={this.state.modalVisible}
				onRequestClose={() => {}}
			>
				<View style={[{ flex: 1 }]}>
					<View
						style={{
							height: 40,
							marginBottom: 10,
							alignItems: "flex-start"
						}}
					>
						<TouchableHighlight
							onPress={() => {
								this.setModalVisible(!this.state.modalVisible);
							}}
						>
							<View
								style={{
									flexDirection: "row",
									justifyContent: "center",
									alignItems: "center"
								}}
							>
								<Entypo name="chevron-left" size={25} color="black" />
								<Text style={[styles.h5, styles.bold]}>Filtres</Text>
							</View>
						</TouchableHighlight>
					</View>
					<Filters getFilters={this.getFilters} />
				</View>
			</Modal>
		);
	}

	componentDidMount() {
		this.getChallenges();
	}

	renderNull() {
		return (
			<View
				style={[
					styles.container,
					{
						flex: 1,
						paddingTop: 30
					}
				]}
			>
				<ListBar setModalVisible={this.setModalVisible} />
				{this.renderFilters()}
				<View
					style={[
						styles.container,
						{
							flex: 1,
							justifyContent: "space-evenly"
						}
					]}
				>
					<Image
						resizeMode="cover"
						style={{
							height: 180,
							width: 180
							// marginVertical: 25
						}}
						source={{
							uri:
								"https://res.cloudinary.com/humanchallenge/image/upload/v1544196673/humanChallenge/sitting_alone.gif"
						}}
					/>
					<Text style={[styles.textCenter, styles.textBlack, styles.h4]}>
						0 défi trouvé
					</Text>
					<Text style={[styles.textCenter, styles.textGray, styles.h5]}>
						Nous ne trouvons aucun défi avec les critères sélectionnés
					</Text>
					<TouchableOpacity
						onPress={() =>
							this.setState(
								{
									params: {
										distance: 3000000
									}
								},
								() => this.getChallenges()
							)
						}
						style={[
							styles.button,
							styles.primaryButtonColor,
							styles.marginV10,
							customStyles.w100
						]}
					>
						<Text style={[styles.textCenter, styles.textWhite]}>
							{"Voir tous les défis".toUpperCase()}
						</Text>
					</TouchableOpacity>
					<TouchableOpacity
						onPress={() => this.props.navigation.navigate("CreateChallenge")}
						style={[
							styles.button,
							styles.secondaryButtonColor,
							customStyles.w100
						]}
					>
						<Text style={[styles.textCenter, styles.textWhite]}>
							{"Créer un défi".toUpperCase()}
						</Text>
					</TouchableOpacity>
				</View>
			</View>
		);
	}

	renderList() {
		return (
			<View style={[styles.container]}>
				<ListBar setModalVisible={this.setModalVisible} />
				{this.renderFilters()}
				<View>
					<FlatList
						data={this.state.Challenges}
						keyExtractor={this._keyExtractor}
						renderItem={({ item, index }) => {
							if (index === 0) {
								return (
									<View
										style={{
											marginBottom: 1,
											paddingTop: 48
										}}
									>
										<TouchableOpacity
											// Ajouter les props pour Anne et enlever le truc moche quand tu click
											onPress={() =>
												this.props.navigation.navigate("Challenge")
											}
										>
											<ChallengeCard id={item._id} challenge={item} />
										</TouchableOpacity>
									</View>
								);
							} else {
								return (
									<View
										style={{
											marginBottom: 1
										}}
									>
										<TouchableOpacity
											// Ajouter les props pour Anne et enlever le truc moche quand tu click
											onPress={() =>
												this.props.navigation.navigate("Challenge")
											}
										>
											<ChallengeCard id={item._id} challenge={item} />
										</TouchableOpacity>
									</View>
								);
							}
						}}
					/>
				</View>
			</View>
		);
	}

	render() {
		return this.state.counter === undefined ? (
			<View
				style={
					([styles.container],
					{
						flex: 1,
						justifyContent: "center"
					})
				}
			>
				<ActivityIndicator size="large" color="black" />
			</View>
		) : this.state.counter === 0 ? (
			this.renderNull()
		) : (
			this.renderList()
		);
	}
}

const customStyles = StyleSheet.create({
	w100: {
		width: Dimensions.get("window").width - 60
	}
});
export default ChallengesList;
