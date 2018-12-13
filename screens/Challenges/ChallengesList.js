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
	TouchableHighlight,
	TextInput
} from "react-native";
import { MapView } from "expo";
import styles from "../../Styles";
import ChallengeCard from "../../components/ChallengeCard";
import axios from "axios";
import ListBar from "../../components/ListBar";
import Filters from "../../components/Filters";
import { Entypo } from "@expo/vector-icons";
import Display from "react-native-display";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import Carousel from "react-native-snap-carousel";

const homePlace = {
	description: "Adresse",
	geometry: { location: { lat: 48.8152937, lng: 2.4597668 } }
};
const workPlace = {
	description: "Travail, si t'en a, sinon l'@ de tes parents",
	geometry: { location: { lat: 48.8496818, lng: 2.2940881 } }
};
class ChallengesList extends React.Component {
	static navigationOptions = {
		header: null
	};

	state = {
		step: 1,
		modalVisible: false,
		params: { distance: 60, name: "", latitude: 45, longitude: 2 },
		filterHelpers: {
			Environnement: true,
			Social: true,
			Animaux: true,
			Culture: true,
			half: false,
			day: false,
			more: false
		},
		enable: false
	};

	componentDidMount() {
		this.getChallenges();
	}

	GooglePlacesInput = () => {
		return (
			<GooglePlacesAutocomplete
				placeholder="Adresse"
				minLength={2} // minimum length of text to search
				autoFocus={false}
				returnKeyType={"search"} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
				listViewDisplayed="auto" // true/false/undefined
				fetchDetails={true}
				renderDescription={row => row.description} // custom description render
				onPress={(data, details = null) => {
					// 'details' is provided when fetchDetails = true
					console.log(details.geometry.location);
					this.setState(
						{
							params: {
								...this.state.params,
								latitude: details.geometry.location.lat,
								longitude: details.geometry.location.lng
							}
						},
						() => this.getChallenges()
					);
				}}
				getDefaultValue={() => ""}
				listUnderlayColor="white"
				query={{
					// available options: https://developers.google.com/places/web-service/autocomplete
					key: "AIzaSyDVe2qiHnbsUl7Jrnt8S_I02UnVcBtT_0U",
					language: "fr", // language of the results
					types: ["(address)", "(region)", "(cities)", "(geocode)"] // default: 'geocode'
				}}
				styles={{
					container: {
						backgroundColor: "white",

						borderColor: "blue",
						borderWidth: 1,
						borderRadius: 20,

						borderBottomRightRadius: 0,
						width: 300
					},
					textInputContainer: {
						width: "100%",
						backgroundColor: "white",
						borderTopWidth: 0,
						height: 40,
						borderBottomWidth: 0,
						borderColor: "blue",
						borderRadius: 20
					},
					description: {
						borderRadius: 20,
						color: "gray"
					},
					predefinedPlacesDescription: {
						color: "blue",
						borderRadius: 20
					},
					row: {
						backgroundColor: "white",
						borderRadius: 20
					},
					poweredContainer: {
						backgroundColor: "white",
						borderRadius: 20,
						display: "none"
					}
				}}
				currentLocation={true} // Will add a 'Current location' button at the top of the predefined places list
				currentLocationLabel="Localisation actuelle"
				nearbyPlacesAPI="GooglePlacesSearch" // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
				GoogleReverseGeocodingQuery={
					{
						// available options for GoogleReverseGeocoding API : https://developers.google.com/maps/documentation/geocoding/intro
					}
				}
				GooglePlacesSearchQuery={{
					// available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
					rankby: "distance",
					types: "food"
				}}
				filterReverseGeocodingByTypes={[
					"locality",
					"administrative_area_level_3"
				]} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities
				predefinedPlaces={[homePlace, workPlace]}
				debounce={200} // debounce the requests in ms. Set to 0 to remove debounce. By default 0ms.
				renderLeftButton={null}
				renderRightButton={null}
				isRowScrollable={true}
			/>
		);
	};

	// Change view between map and list
	setStep = step => {
		this.setState({
			step
		});
	};

	// Display SearchBar
	toggleDisplay = () => {
		this.setState({ enable: !this.state.enable });
	};

	// Display Filters
	setModalVisible = visible => {
		this.setState({ modalVisible: visible });
	};

	// Give each Flatlist item a unique key
	_keyExtractor = (item, index) => item._id;

	// Recup the challenges
	getChallenges() {
		axios
			.get("http://human-challenge-back-end.herokuapp.com/api/challenge", {
				params: this.state.params
			})
			.then(response => {
				this.setState(response.data, () => {});
			});
	}

	// Recup the filters
	getFilters = (filters, obj) => {
		this.setState({ params: filters, filterHelpers: obj }, () => {
			this.getChallenges();
		});
	};

	// Show the cards
	_renderCards({ item, index }) {
		return (
			<TouchableOpacity
				onPress={() => this.props.navigation.navigate("Challenge")}
			>
				<ChallengeCard id={item._id} challenge={item} />
			</TouchableOpacity>
		);
	}

	// Show the filters
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
							justifyContent: "center",
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
									justifyContent: "space-between",
									alignItems: "center",
									width: "100%"
								}}
							>
								<View
									style={{
										flexDirection: "row",

										alignItems: "center"
									}}
								>
									<Entypo name="chevron-left" size={25} color="black" />
									<Text style={[styles.h5, styles.bold]}>Filtres</Text>
								</View>
								<View
									style={{
										backgroundColor: "black",
										marginRight: 8,
										height: 30,
										width: 30,
										borderRadius: 15,
										alignItems: "center",
										justifyContent: "center"
									}}
								>
									<Text style={[{ color: "white" }]}>{this.state.counter}</Text>
								</View>
							</View>
						</TouchableHighlight>
					</View>
					<Filters
						getFilters={this.getFilters}
						distance={this.state.params.distance}
						filterHelpers={this.state.filterHelpers}
					/>
				</View>
			</Modal>
		);
	}

	// No results case
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
				<ListBar
					setModalVisible={this.setModalVisible}
					toggleDisplay={this.toggleDisplay}
					enable={this.props.enable}
					setStep={this.setStep}
					whereAmI={this.state.step}
				/>
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
										distance: 3000000,
										latitude: 45,
										longitude: 2
									},
									filterHelpers: {
										Environnement: true,
										Social: true,
										Animaux: true,
										Culture: true,
										half: false,
										day: false,
										more: false
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

	// Some results case
	renderList() {
		return (
			<View style={[styles.container]}>
				<ListBar
					setModalVisible={this.setModalVisible}
					toggleDisplay={this.toggleDisplay}
					enable={this.state.enable}
					setStep={this.setStep}
					whereAmI={this.state.step}
				/>
				{this.renderFilters()}
				<Display
					style={{ position: "absolute", top: 60, zIndex: 15 }}
					enable={this.state.enable}
					enterDuration={500}
					exitDuration={250}
					exit="fadeOutLeft"
					enter="fadeInLeft"
				>
					<TextInput
						placeholder="Nom du Challenge"
						style={{
							paddingLeft: 20,
							backgroundColor: "white",
							height: 40,
							borderColor: "blue",
							borderWidth: 1,
							borderRadius: 20,
							width: 300,
							marginBottom: 10
						}}
						onChangeText={text =>
							this.setState(
								{ params: { ...this.state.params, name: text } },
								() => this.getChallenges()
							)
						}
						value={this.state.params.name}
					/>
				</Display>
				<View>
					{/* <FlatList
						style={{ paddingTop: 50 }}
						data={this.state.Challenges}
						keyExtractor={this._keyExtractor}
						renderItem={({ item, index }) => {
							if (index === 0) {
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
					/> */}
					<Carousel
						ref={c => {
							this._carousel = c;
						}}
						data={this.state.Challenges}
						renderItem={this._renderCards}
						sliderWidth={Dimensions.get("window").width}
						itemWidth={Dimensions.get("window").width - 40}
					/>
				</View>
			</View>
		);
	}

	renderCaseList() {
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

	renderCaseMap() {
		return (
			<View style={[styles.container, { flex: 1 }]}>
				<ListBar
					setModalVisible={this.setModalVisible}
					toggleDisplay={this.toggleDisplay}
					enable={this.state.enable}
					setStep={this.setStep}
					whereAmI={this.state.step}
				/>
				{this.renderFilters()}
				<Display
					style={{ position: "absolute", top: 60, zIndex: 15 }}
					enable={this.state.enable}
					enterDuration={500}
					exitDuration={250}
					exit="fadeOutLeft"
					enter="fadeInLeft"
				>
					{this.GooglePlacesInput()}
				</Display>
				<View style={{ position: "absolute", bottom: 40, zIndex: 2 }}>
					<Carousel
						ref={c => {
							this._carousel = c;
						}}
						data={this.state.Challenges}
						renderItem={this._renderCards}
						sliderWidth={Dimensions.get("window").width}
						itemWidth={Dimensions.get("window").width - 60}
						enableSnap={true}
						loop={true}
					/>
				</View>
				<MapView
					style={{
						flex: 1,
						height: Dimensions.get("window").height,
						width: Dimensions.get("window").width,
						zIndex: 0
					}}
					region={{
						latitude: this.state.params.latitude,
						longitude: this.state.params.longitude,
						latitudeDelta: 0.0922,
						longitudeDelta: 0.0421
					}}
					loadingEnabled={true}
					loadingIndicatorColor="black"
				/>
			</View>
		);
	}

	render() {
		switch (this.state.step) {
			case 1:
				return this.renderCaseList();
			case 2:
				return this.renderCaseMap();
		}
	}
}

const customStyles = StyleSheet.create({
	w100: {
		width: Dimensions.get("window").width - 60
	}
});
export default ChallengesList;
