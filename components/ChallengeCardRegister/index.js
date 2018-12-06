import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import styles from "../../Styles";
import { Entypo } from "@expo/vector-icons";
//on importe un élément de la librairie vector-icons
import { Foundation } from "@expo/vector-icons";
//on importe toute la librairie de vector-icons
import VectorIcons from "@expo/vector-icons";

// console.log(VectorIcons);

class ChallengeCardRegister extends React.Component {
  renderIcon() {
    if (this.props.type === "Environnement") {
      return "tree";
    }
    if (this.props.type === "Social") {
      return "social-reddit";
    }
    if (this.props.type === "Animaux") {
      return "feather";
    }
    if (this.props.type === "Environnement") {
      return "palette";
    }
    return null;
  }

  render() {
    return (
      <View
        style={{
          marginTop: 50,
          backgroundColor: "grey",
          borderWidth: 0.5,
          weight: 1500,
          height: 40
        }}
      >
        <Foundation name={this.renderIcon()} size={35} color="blue" />
      </View>
    );
  }
}
export default ChallengeCardRegister;
