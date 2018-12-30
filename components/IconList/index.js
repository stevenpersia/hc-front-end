import React from "react";
import { StyleSheet, Text, View, Image, FlatList } from "react-native";
import styles from "../../Styles";
import { Entypo } from "@expo/vector-icons";
import LittleAvatar from "../LittleAvatar";
import Icon from "../../components/Icon";
import { Tooltip } from "react-native-elements";

// Liste d'icones qui apparait sous l'onglet Prerequis //
class IconList extends React.Component {
  test = [
    {
      name: "Mobile",
      description: "Etre Mobile",
      icon: {
        url:
          "https://previews.123rf.com/images/file404/file4041305/file404130500004/19601395-ic%C3%B4ne-coureur.jpg"
      }
    },
    {
      name: "Horaire flexible",
      description: "Etre Flexible ",
      icon: {
        url:
          "https://previews.123rf.com/images/glopphy/glopphy1505/glopphy150500049/40132709-la-nature-de-la-sant%C3%A9-vecteur-web-carte-d-identit%C3%A9-logo.jpg"
      }
    },

    {
      name: "Responsable",
      description: "Responsabilité",
      icon: {
        url:
          "https://previews.123rf.com/images/graphicsdunia4you/graphicsdunia4you1508/graphicsdunia4you150800014/43891030-personnes-eco-c%C3%A9l%C3%A9bration-ic%C3%B4ne-conception-vecteur.jpg"
      }
    },
    {
      name: "Majeur",
      description: "Avoir 18 ans",
      icon: {
        url:
          "https://previews.123rf.com/images/vasyll/vasyll1712/vasyll171200190/91103080-under-eighteen-years-prohibition-sign-adults-only-vector-illustration-.jpg"
      }
    },
    {
      name: "Respect",
      description: "Respecter l'environnement",
      icon: {
        url:
          "https://previews.123rf.com/images/anatolir/anatolir1810/anatolir181006412/110880890-recycling-bin-icon-simple-illustration-of-recycling-bin-icon-for-web-design-isolated-on-white-backgr.jpg"
      }
    }
  ];

  render() {
    const result = [];

    for (let i = 0; i < this.test.length; i++) {
      result.push(
        // La clé key doit se trouvé dans le parent Tooltip :contient l'enfant Icon.
        <Tooltip key={i} popover={<Text>{this.test[i].name}</Text>}>
          <Icon
            //   icon={icons[i].icon.url[0]}
            icon={this.test[i].icon.url}
            name={this.test[i].name}
          />
        </Tooltip>
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
