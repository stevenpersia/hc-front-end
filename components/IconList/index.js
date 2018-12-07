import React from "react";
import { StyleSheet, Text, View, Image, FlatList } from "react-native";
import styles from "../../Styles";
import { Entypo } from "@expo/vector-icons";
import LittleAvatar from "../LittleAvatar";
import IconPrerequisites from "../../components/IconPrerequisites";

class IconList extends React.Component {
  test = [
    {
      name: "Avoir 18 ans",
      description: "etre majeur",
      icon: {
        url:
          "http://lescenobitestranquilles.fr/wp-content/uploads/2013/11/geluck-bougies-anniversaire.jpg"
      }
    }
  ];

  render() {
    const result = [];

    for (let i = 0; i < this.test.length; i++) {
      result.push(
        <IconPrerequisites
          //   icon={icons[i].icon.url[0]}
          icon={this.test[i].icon.url}
          key={i}
        />
      );
    }
    return result;
  }
}

/*
const styles = StyleSheet.create({
	customCSS: {}
});
*/

export default IconList;
