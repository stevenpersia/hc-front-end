import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import styles from "../../Styles";
import { Entypo } from "@expo/vector-icons";
//on importe un élément de la librairie vector-icons
import { Foundation } from "@expo/vector-icons";
//on importe toute la librairie de vector-icons
import VectorIcons from "@expo/vector-icons";
import AvatarList from "../AvatarList";
import ChallengeCardItem from "../ChallengeCardItem";
import ChallengeCardCategory from "../ChallengeCardCategory";

// console.log(VectorIcons);

class ChallengeCardRegister extends React.Component {
  renderIconRegister() {
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
      <onScroll>
        <View
          style={{
            backgroundColor: "grey",
            borderWidth: 0.5,
            weight: 100,
            height: 20
          }}
        >
          <Foundation name={this.renderIconRegister()} size={35} color="blue" />
          <View style={[{ position: "absolute", bottom: 200, zIndex: 1 }]}>
            <AvatarList challengers={challenge.challengers} />
          </View>

          <View
            style={{ position: "absolute", bottom: 200, left: 8, zIndex: 1 }}
          >
            <ChallengeCardItem
              icon="calendar"
              text={format(challenge.date.beginDate, "dddd DD MMMM")}
            />
          </View>
        </View>
      </onScroll>
    );
  }
}
export default ChallengeCardRegister;
