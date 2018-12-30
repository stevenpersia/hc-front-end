import React from "react";
import MapView from "react-native-maps";
import { StyleSheet, View } from "react-native";

export default class ChallengesMap extends React.Component {
  render() {
    console.log("sofiane le magnifique", this.props);
    return (
      <View style={{ flex: 1 }}>
        <MapView
          style={{ height: 200 }}
          initialRegion={{
            latitude: 48.866667,
            longitude: 2.333333,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421
          }}
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

const map = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    justifyContent: "flex-end",
    alignItems: "center"
  },
  map: { position: "absolute", top: 0, left: 0, bottom: 0, right: 0 }
});
