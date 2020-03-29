import React, { Component } from "react";
import "./App.css";
import cover from "./images/cover.png";
import LoginBox from "./LoginBox";
import Encoder from "./Encoder";
import HomePage from "./HomePage";

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      displayLogin: false,
      loginFail: false,
      loginToken: null,
      displayEncoder: false
    };
  }

  onContinue = () => {
    document.getElementById("home-div").className = "bg-text hide";
    setTimeout(
      () =>
        this.setState({
          displayLogin: true
        }),
      1000
    );
  };

  login = (email, password) => {
    let headers = new Headers();

    headers.append("Content-Type", "application/json");

    const requestOptions = {
      method: "POST",
      headers: headers,
      body: JSON.stringify({ email, password })
    };

    fetch("/login", requestOptions)
      .then(response => {
        if (response.status === 401) this.setState({ loginFail: true });
        return response.json();
      })
      .then(data => {
        document.getElementById("loginDiv").className = "login-div hide";
        setTimeout(() => {
          this.setState({ displayEncoder: true, loginToken: data.token, loginFail: false });
        }, 1000);
      });
  };

  resetLoginFail = () => {
    this.setState({ loginFail: false });
  };

  render() {
    let { displayLogin, displayEncoder, loginToken, loginFail } = this.state;

    return (
      <div className="App">
        {displayEncoder ? (
          <Encoder token={loginToken} />
        ) : (
          <div>
            <img src={cover} className="Cover" alt="Cover" />
            {!displayLogin ? (
              <HomePage onContinue={this.onContinue} />
            ) : (
              <LoginBox resetLoginFail={this.resetLoginFail} loginFail={loginFail} login={this.login} />
            )}
          </div>
        )}
      </div>
    );
  }
}
