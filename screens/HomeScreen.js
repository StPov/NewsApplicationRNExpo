import React, { Component } from "react";
import {
  AppRegistry,
  StyleSheet,
  Dimensions,
  View,
  ActivityIndicator
} from "react-native";
import { FocusScrollView } from "react-native-focus-scroll";
import Channel from "../services/models/Channel";

export default class example extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      dataSource: []
    };
  }

  componentDidMount() {
    return fetch("https://newsapi.org/v2/sources?apiKey=8c66ce1dfb9245cf9fe9be0a484d713e")
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState(
          {
            isLoading: false,
            dataSource: responseJson,
          },
          function () {}
        );
      })
      .catch((error) => {
        console.error(error);
      });
  }
  render() {
    if (this.state.isLoading) {
      return (
        <View style={{ flex: 1, padding: 20 }}>
          <ActivityIndicator />
        </View>
      );
    } else {
        let channels = this.state.dataSource.sources
        return (
            <View style={styles.container}>
                <FocusScrollView threshold={dim.width / 2}>
                 {channels.map((channel, index) => (
                    <Channel
                        key={index}
                        name={channel.name}
                        description={channel.description}
                        // image={`../../assets/images/channels_background/news${Math.floor(Math.random()*10)}.jpg`}
                    />
                ))}
                </FocusScrollView>
            </View>
        );
    }
  }
}

const dim = Dimensions.get("screen");
const styles = StyleSheet.create({
  container: {
    top: 20,
  },
});

AppRegistry.registerComponent("example", () => example);
