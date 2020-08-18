import React, {Component} from 'react';
import {View} from 'react-native';
import {Header, Button, CardSection, Spinner} from './src/components/common';
import LoginScreen from './src/components/screens/LoginScreen';
import firebase from './src/config/Firebase';

class App extends Component {
  state = {isLoggedIn: null};
  constructor(props) {
    super(props);
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({isLoggedIn: true});
      } else {
        this.setState({isLoggedIn: false});
      }
    });
  }

  renderContent() {
    switch (this.state.isLoggedIn) {
      case true:
        return (
          <CardSection>
            <Button onPress={() => firebase.auth().signOut()}>Log Out</Button>
          </CardSection>
        );
      case false:
        return <LoginScreen />;
      default:
        return (
          <View style={styles.spinnerStyle}>
            <Spinner size="large" />
          </View>
        );
    }
  }

  render() {
    return (
      <View>
        <Header HeaderText="Authentication" />
        {this.renderContent()}
      </View>
    );
  }
}

const styles = {
  spinnerStyle: {
    top: '50%',
    justifyContent: 'center',
    alignItems: 'center',
  },
};

export default App;
