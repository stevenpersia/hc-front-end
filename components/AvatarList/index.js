import React from "react";
import { StyleSheet, Text, View, Image, FlatList } from "react-native";
import styles from "../../Styles";
import { Entypo } from "@expo/vector-icons";
import LittleAvatar from "../LittleAvatar";

class AvatarList extends React.Component {

	renderAvatars(team) {
		const result = [];
		const maxNum = 5;
		const shift = 15;
		const itemWidth = 40;
		let numberItems = maxNum;
		if (team.length < maxNum) {
			numberItems = team.length;
		}



    for (let i = 0; i < maxNum && i < team.length; i++) {
      result.push(
        <LittleAvatar
          key={i}
          name={team[i].account.username}
          photo={team[i].account.avatar[0]}
          variant={this.props.variant || false}
        />
      );
    }
    return result;
  }


  render() {
    let testStyle = {
      marginLeft: this.props.variant ? 0 : -25
    };
    if (this.props.variant) {
      testStyle.width = "80%";
      testStyle.justifyContent = "space-between";
      testStyle.justifyContent = "space-around";
    }
    return (
      <View style={[styles.flexRowReverse, testStyle]}>
        {this.renderAvatars(this.props.challengers)} 
        
      </View>
    );
  }

}

/*
const styles = StyleSheet.create({
	customCSS: {}
});
*/

export default AvatarList;
