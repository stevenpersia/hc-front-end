import React from "react";
import { StyleSheet, Text, View, Image, FlatList } from "react-native";
import styles from "../../Styles";
import { Entypo } from "@expo/vector-icons";
import LittleAvatar from "../LittleAvatar";
import Icon from "../../components/Icon";

// Liste d'icones qui apparait sous l'onglet Prerequis //
class IconList extends React.Component {
  test = [
    {
      name: "Avoir 18 ans",
      description: "etre majeur",
      icon: {
        url:
          "https://www.misterfiesta.com/11665-large_default/ballons-anniversaire-18-ans-x6.jpg"
      }
    },
    {
      name: "Respecter l'environnement",
      description: "Respecter l'environnement",
      icon: {
        url: "http://p9.storage.canalblog.com/97/24/1418441/108185841_o.jpg"
      }
    },
    {
      name: "Etre Mobile",
      description: "Etre Mobile",
      icon: {
        url:
          "https://fr.seaicons.com/wp-content/uploads/2015/11/Sports-Paddling-icon.png"
      }
    },
    {
      name: "Flexible",
      description: "Etre Flexible sur les horaires",
      icon: {
        url:
          "https://fr.depositphotos.com/160870700/stock-illustration-flexible-hours-sign-or-stamp.html"
      }
    },
    {
      name: "Flexible",
      description: "Etre Flexible sur les horaires",
      icon: {
        url: "http://szaboka.com/wp-content/uploads/2012/03/038-NoTime.jpg"
      }
    }
  ];

  render() {
    const result = [];

    for (let i = 0; i < this.test.length; i++) {
      result.push(
        <Icon
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
