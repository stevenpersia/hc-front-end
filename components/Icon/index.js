import React from "react";
import { Image, View } from "react-native";

// Definition de la Taille et source de l'icone des prérequis
class Icon extends React.Component {
  render() {
    return (
      <View>
        <Image
          style={{
            width: 60,
            height: 60,
            borderRadius: 20,
            marginLeft: "3%",
            opacity: 1
          }}
          source={{
            uri: this.props.icon
          }}
        />
      </View>
    );
  }
}

export default Icon;
