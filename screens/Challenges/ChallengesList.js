import React from "react";
import { StyleSheet, Text, View, FlatList, StatusBar } from "react-native";
import styles from "../../Styles";
import ChallengeCard from "../../components/ChallengeCard";
import axios from "axios";

class ChallengesList extends React.Component {
  _keyExtractor = (item, index) => item._id;

  state = {};

  getChallenges() {
    axios
      .get(
        "https://human-challenge-back-end.herokuapp.com/api/challenge?distance=300000000"
      )
      .then(response => {
        this.setState(response.data, () => {
          // console.log(this.state);
        });
      });
  }
  // this pour importer ce qui se trouve dans la classe
  componentDidMount() {
    this.getChallenges();
  }

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={this.state.Challenges}
          keyExtractor={this._keyExtractor}
          renderItem={({ item }) => (
            <View style={{ marginBottom: 1 }}>
              <ChallengeCard id={item._id} challenge={item} />
            </View>
          )}
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

export default ChallengesList;
