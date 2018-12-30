import React from "react";
import {
	StyleSheet,
	Text,
	View,
	Dimensions,
	TouchableOpacity,
	TouchableHighlight
} from "react-native";
import styles from "../../Styles";
import { Entypo } from "@expo/vector-icons";

class ListBar extends React.Component {
	render() {
		return (
			<View
				style={{
					height: 48,
					position: "absolute",
					top: 0,
					left: 0,
					width: Dimensions.get("window").width,
					zIndex: 12,
					flexDirection: "row",
					flex: 1,
					justifyContent: "space-between",
					alignItems: "center",
					paddingHorizontal: 4
				}}
			>
				<View
					style={{
						flex: 1,
						flexDirection: "row",
						justifyContent: "flex-start",
						alignItems: "center"
					}}
				>
					<Entypo
						name="list"
						size={30}
						color="black"
						style={{
							backgroundColor: "white",
							borderRadius: 8
						}}
					/>
				</View>
				<View
					style={{
						flex: 3,
						flexDirection: "row",
						justifyContent: "center",
						alignItems: "center"
					}}
				>
					<TouchableOpacity
						onPress={() => {}}
						style={[styles.buttonSmall, styles.secondaryButtonColor]}
					>
						<Text style={[styles.textCenter, styles.textWhite]}>
							{"map".toUpperCase()}
						</Text>
					</TouchableOpacity>
					<TouchableOpacity
						onPress={() => {}}
						style={[styles.buttonSmall, styles.primaryButtonColor]}
					>
						<Text style={[styles.textCenter, styles.textWhite]}>
							{"liste".toUpperCase()}
						</Text>
					</TouchableOpacity>
				</View>

				<View
					style={{
						flex: 1,
						flexDirection: "row",
						justifyContent: "space-between",
						alignItems: "center"
					}}
				>
					<TouchableHighlight
						onPress={() => {
							this.props.toggleDisplay();
						}}
					>
						<Entypo
							name="magnifying-glass"
							size={30}
							color="black"
							style={{
								backgroundColor: "white",
								borderRadius: 8
							}}
						/>
					</TouchableHighlight>
					<TouchableHighlight
						onPress={() => {
							this.props.setModalVisible(true);
						}}
					>
						<Entypo
							name="funnel"
							size={30}
							color="black"
							style={{
								backgroundColor: "white",
								borderRadius: 8
							}}
						/>
					</TouchableHighlight>
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

export default ListBar;
