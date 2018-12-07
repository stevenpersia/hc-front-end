import React from "react";
import { Image } from "react-native";
import styles from "../../Styles";

class IconPrerequisites extends React.Component {
  render() {
    return (
      <Image
        style={{
          width: 40,
          height: 40,
          borderRadius: 20,
          opacity: 1
        }}
        source={{
          uri: this.props.icon
        }}
      />
    );
  }
}

export default IconPrerequisites;
