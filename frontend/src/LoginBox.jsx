import React, { Component } from "react";
import { TextField, Button } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import "./App.css";

const styles = theme => ({
  margin: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3)
  },
  error: {
    margin: "auto",
    color: theme.palette.error.main
  }
});

class LoginBox extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      emailError: false,
      emailErrorText: "",
      passwordError: false,
      passwordErrorText: "",
      loginError: false,
      loginErrorText: ""
    };
  }

  componentDidUpdate() {
    if (this.props.loginFail) {
      this.setState({
        loginError: true,
        loginErrorText: "Email or password are incorrect"
      });
      this.props.resetLoginFail();
    }
  }

  handleChange = (e, field) => {
    let value = e.target.value;

    this.setState({
      [field]: value,
      [field + "Error"]: value !== "" ? false : true,
      [field + "ErrorText"]: value !== "" ? "" : field.charAt(0).toUpperCase() + field.slice(1) + " cannot be empty"
    });
  };

  checkLoginData = e => {
    let { email, password, emailError, passwordError, emailErrorText, passwordErrorText } = this.state;
    e.preventDefault();

    email = email.toLowerCase();
    let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.match(emailRegex)) {
      emailError = true;
      emailErrorText = "Email is invalid";
    }

    let passwRegex = /^(?=.*\d)(?=.*[a-z]).{6,}$/;
    if (!password.match(passwRegex)) {
      passwordError = true;
      passwordErrorText = "Password must be at least 6 characters long and contain at least 1 number";
    }

    if (email === "") {
      emailError = true;
      emailErrorText = "Email cannot be empty";
    }

    if (password === "") {
      passwordError = true;
      passwordErrorText = "Password cannot be empty";
    }

    if (emailError || passwordError) this.setState({ emailError, passwordError, emailErrorText, passwordErrorText, loginError: false });
    else this.props.login(email, password);
  };

  render() {
    let { emailError, passwordError, emailErrorText, passwordErrorText, loginError, loginErrorText } = this.state;
    let { classes } = this.props;

    return (
      <div id="loginDiv" className="login-div show">
        <h2>Login</h2>
        <form autoComplete="off" onSubmit={this.checkLoginData}>
          <TextField
            error={emailError}
            helperText={emailErrorText}
            className={classes.margin}
            id="email-textfield"
            label="Email"
            variant="outlined"
            onChange={e => this.handleChange(e, "email")}
            fullWidth
          />
          <TextField
            error={passwordError}
            helperText={passwordErrorText}
            className={classes.margin}
            id="password-textfield"
            label="Password"
            type="password"
            variant="outlined"
            onChange={e => this.handleChange(e, "password")}
            fullWidth
          />
          {loginError ? <div className={classes.error}>{loginErrorText}</div> : ""}
          <Button className={classes.margin} variant="outlined" type="submit">
            Login
          </Button>
        </form>
      </div>
    );
  }
}

export default withStyles(styles)(LoginBox);
