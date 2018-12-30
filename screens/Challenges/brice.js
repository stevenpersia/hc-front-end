import React, { Component } from "react";
import {
	Text,
	View,
	FlatList,
	StyleSheet,
	TouchableOpacity,
	Dimensions,
	Image,
	RefreshControl,
	StatusBar
} from "react-native";
import axios from "axios";
import config from "../config";
import ItemCard from "../components/ItemCard";
import PropTypes from "prop-types";
import Display from "react-native-display";
import Icon from "react-native-vector-icons/FontAwesome";

import { SearchBar, Badge } from "react-native-elements";
const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;
export default class MainScreen extends Component {
	static propTypes = {
		navigation: PropTypes.object
	};

	static navigationOptions = ({ navigation }) => ({
		headerTitle: (
			<Image
				resizeMode="cover"
				style={{
					width: 175,
					height: 60,
					resizeMode: "contain",
					alignSelf: "center"
				}}
				source={require("../images/Rentabily_white.png")}
			/>
		),

		headerRight: (
			<Icon
				style={{ marginRight: 20 }}
				name="search"
				size={30}
				color="white"
				onPress={navigation.state.params.toggleDisplay}
				title="Toggle display"
				accessibilityLabel="Toggle display for show/hide searchbar"
			/>
		),

		headerStyle: {
			backgroundColor: "#1FA1F2",
			borderBottomColor: "#1FA1F2"
		},
		headerBackTitle: true,
		headerTintColor: "white"
	});

	state = {
		city: "",
		items: [],
		title: "",
		address: "",
		deviceLocation: null,
		refreshing: false,
		enable: false
	};

	fetchItems = () => {
		navigator.geolocation.getCurrentPosition(
			position => {
				const deviceLocation = position;
				console.log("deviceLocation coords", deviceLocation);
				console.log("deviceLocation coords", deviceLocation);
				axios
					.get(config.DOMAIN + "api/item/around", {
						params: {
							positionLon: deviceLocation.coords.longitude,
							positionLat: deviceLocation.coords.latitude
						}
					})
					.then(response => {
						console.log("response.data ds Main", response.data);
						this.setState({
							items: response.data
						});
					});
				this.setState({
					deviceLocation
				});
			},
			error => alert(error.message),
			{ enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
		);
	};

	onChangeSearchText = text => {
		this.setState({ title: text });
		if (this.state.address.length > 0) {
			axios
				.get(config.DOMAIN + "api/item", {
					params: {
						title: text,
						address: this.state.address
					}
				})
				.then(response => {
					this.setState({
						items: response.data
					});
				});
		} else {
			axios
				.get(config.DOMAIN + "api/item/around", {
					params: {
						title: text,
						positionLat: this.state.deviceLocation.coords.longitude,
						positionLon: this.state.deviceLocation.coords.latitude
					}
				})
				.then(response => {
					console.log("response.Data ds main::", response.data);
					this.setState({
						items: response.data
					});
				});
		}
	};

	onChangeSearchAddress = text => {
		this.setState({ address: text });
		if (this.state.address.length > 0)
			axios
				.get(config.DOMAIN + "api/item", {
					params: {
						title: this.state.title,
						address: text
					}
				})
				.then(response => {
					this.setState({
						address: response.data
					});
				});
		else
			axios
				.get(config.DOMAIN + "api/item/around", {
					params: {
						title: text,
						positionLat: this.state.deviceLocation.coords.longitude,
						positionLon: this.state.deviceLocation.coords.latitude
					}
				})
				.then(response => {
					this.setState({
						items: response.data
					});
				});
	};
	renderAvatar = item => {
		console.log("item.owner.account", item.owner.account);
		if (item.owner.account.avatar[0]) {
			return item.owner.account.avatar[0].secure_url;
		} else return "";
	};

	toggleDisplay = () => {
		let toggle = !this.state.enable;
		console.log("togggle", toggle);
		this.setState({ enable: toggle });
	};

	render() {
		return (
			<View style={styles.container}>
				{/* <View>
          <Text style={styles.headerTitle}> Toutes les offres</Text>
        </View> */}
				<View>
					<StatusBar backgroundColor="#1FA1F2" />
				</View>
				<Display
					enable={this.state.enable}
					enterDuration={800}
					exitDuration={300}
					exit="fadeOutLeft"
					enter="fadeInLeft"
				>
					<View style={{ marginBottom: 5, width, justifyContent: "center" }}>
						<SearchBar
							onChangeText={this.onChangeSearchText}
							// onClear={someMethod}
							lightTheme
							round
							placeholder="Recherche..."
							placeholderTextColor="#86939e"
							clearIcon={{ color: "#86939e" }}
							inputStyle={{ backgroundColor: "white" }}
							style={styles.searchcontainer}
							containerStyle={{
								backgroundColor: "#1FA1F2",
								borderWidth: 0, //no effect
								//no effect
								borderBottomColor: "transparent",
								borderTopColor: "#1FA1F2"
							}}
						/>
						<SearchBar
							onChangeText={this.onChangeSearchAddress}
							// onClear={someMethod}
							lightTheme
							round
							placeholder="Où ?"
							placeholderTextColor="#86939e"
							icon={{
								type: "FontAwesome",
								color: "#86939e",
								name: "place"
							}}
							clearIcon={{ color: "#86939e" }}
							inputStyle={{ backgroundColor: "white" }}
							containerStyle={{
								backgroundColor: "#1FA1F2",
								borderWidth: 0, //no effect
								//no effect
								borderBottomColor: "transparent",
								borderTopColor: "transparent"
							}}
						/>
					</View>
				</Display>

				<FlatList
					keyExtractor={item => item._id}
					data={this.state.items}
					renderItem={({ item }) => (
						<TouchableOpacity
							onPress={() => {
								// alert(item._id);
								this.props.navigation.navigate("Item", {
									item: item,
									asker: this.props.navigation.state.params.asker
								});
							}}
						>
							<View style={styles.containerCards}>
								<ItemCard
									key={item.owner._id}
									price={item.price}
									description={item.description}
									username={item.owner.account.username}
									title={item.title}
									// reviews={item.reviews}
									// ratingValue={item.ratingValue}
									avatar={{
										uri: this.renderAvatar(item)
										// uri: item.owner.account.hasOwnProperty("photos")
										//   ? item.owner.account.avatar[0].secure_url[0]
										//   : "https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/User_icon_2.svg/220px-User_icon_2.svg.png"
									}}
									itemPhoto={{
										uri:
											item.pictures.length > 0
												? item.pictures[0].secure_url
												: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/1024px-No_image_available.svg.png"
									}}
									navigation={this.props.navigation}
								/>
							</View>
						</TouchableOpacity>
					)}
				/>

				<View />
			</View>
		);
	}
	componentDidMount() {
		this.fetchItems();
		this.props.navigation.setParams({
			toggleDisplay: this.toggleDisplay
		});
	}
}

const styles = StyleSheet.create({
	container: {
		// backgroundColor: "#F2F2F2",
		backgroundColor: "#EFEFEF",
		flex: 1,
		height
	},
	containerCards: {
		alignItems: "center",
		shadowOffset: { width: 0, height: 0 },
		shadowColor: "#767676",
		shadowOpacity: 0.1
	},
	searchcontainer: {
		backgroundColor: "white",
		borderWidth: 0, //no effect
		shadowColor: "white", //no effect
		borderBottomColor: "transparent",
		borderTopColor: "transparent"
	}
	// headerTitle: {
	//   fontSize: 25,
	//   fontWeight: "bold",
	//   marginLeft: 5,
	//   marginTop: 5,
	//   marginBottom: 5,
	//   color: "#373D3F"
	// }

	// searchBarItem: {
	//   textAlign: "center",
	//   alignItems: "center",
	//   backgroundColor: "white",
	//   marginTop: 5,
	//   marginBottom: 5,
	//   height: 40,
	//   borderBottomColor: "white",
	//   borderBottomWidth: 1,
	//   color: "black"
	//   // placeholderTextColor: "white"
	// }
});

{
	/* <TextInput
            style={styles.searchBarItem}
            placeholderTextColor={"#1FA1F2"}
            placeholder={"A QUEL ENDROIT CHERCHEZ-VOUS"}
            onChangeText={city => this.setState({ city })}
            value={this.state.city}
          />
          <TouchableOpacity onPress={() => this.handlePress()}>
            <Text style={styles.textButton}>GO</Text>
          </TouchableOpacity> */
}
