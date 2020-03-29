import React, { Component } from "react";
import "./App.css";
import { Button } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  button: {
    borderColor: "#90a4ae",
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3)
  }
});

class HomePage extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    let { classes } = this.props;

    return (
      <div id="home-div" className="bg-text show">
        <h2>Code Challenge</h2>
        <h1 style={{ fontSize: "50px" }}>Online String Encoder</h1>
        <p>Shadi Zahran</p>
        <Button variant="outlined" className={classes.button} onClick={this.props.onContinue}>
          Continue to login
        </Button>
      </div>
    );
  }
}

export default withStyles(styles)(HomePage);
