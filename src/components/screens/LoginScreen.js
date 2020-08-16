import React, {Component} from 'react';
import {Text} from 'react-native';
import {Button, Card, CardSection, InputField, Spinner} from '../common';
import firebase from '../../config/Firebase';

class LoginScreen extends Component {
  state = {
    email: '',
    password: '',
    error: '',
    isLoading: false,
  };

  _login() {
    const {email, password} = this.state;
    this.setState({error: '', isLoading: true});
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(this._onLoginSuccess.bind(this))
      .catch(() => {
        firebase
          .auth()
          .createUserWithEmailAndPassword(email, password)
          .then(this._onLoginSuccess.bind(this))
          .catch(this._onLoginFail.bind(this));
      });
  }

  _onLoginSuccess() {
    this.setState({
      email: '',
      password: '',
      error: '',
      isLoading: false,
    });
  }

  _onLoginFail() {
    this.setState({error: 'Authentication Failed!', isLoading: false});
  }

  _renderButton() {
    if (this.state.isLoading) {
      return <Spinner size="small" />;
    }
    return <Button onPress={this._login.bind(this)}>Log in</Button>;
  }

  render() {
    return (
      <Card>
        <CardSection>
          <InputField
            label="Email"
            placeholder="user@email.com"
            value={this.state.email}
            onChangeText={(email) => this.setState({email})}
          />
        </CardSection>

        <CardSection>
          <InputField
            secureTextEntry
            label="Password"
            placeholder="password"
            value={this.state.password}
            onChangeText={(password) => this.setState({password})}
          />
        </CardSection>

        <Text style={styles.errorTextStyle}>{this.state.error}</Text>

        <CardSection>{this._renderButton()}</CardSection>
      </Card>
    );
  }
}

const styles = {
  errorTextStyle: {
    fontSize: 20,
    color: 'red',
    alignSelf: 'center',
  },
};

export default LoginScreen;
