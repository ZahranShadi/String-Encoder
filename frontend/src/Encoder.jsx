import React, { Component } from "react";
import { AppBar, Toolbar, Typography, Button, withStyles, InputBase } from "@material-ui/core";
import "./App.css";

const styles = theme => ({
  button: {
    position: "absolute",
    top: "calc(50% + 175px)",
    left: "calc(50% - 150px)",
    width: "300px"
  },
  textfield: {
    height: "50px",
    lineHeight: "50px",
    width: "300px",
    position: "absolute",
    top: "50%",
    left: "calc(50% - 550px)",
    transform: "translateY(-50%)",
    padding: "5px",
    border: "1px solid gray",
    borderRadius: "5px"
  },
  solutionDiv: {
    minHeight: "50px",
    lineHeight: "50px",
    minWidth: "300px",
    maxWidth: "300px",
    position: "absolute",
    top: "50%",
    left: "calc(50% + 250px)",
    textAlign: "center",
    wordBreak: "break-word",
    padding: "0 5px 0 5px",
    transform: "translateY(-50%)",
    border: "1px solid gray",
    borderRadius: "5px"
  }
});

class Encoder extends Component {
  constructor(props) {
    super(props);

    this.timers = [];

    this.state = {
      string: "",
      solution: "",
      processing: false
    };
  }

  encode = () => {
    let { string } = this.state;
    let { token } = this.props;

    let stringRegex = /^[A-Za-z]+$/;
    if (!string.match(stringRegex) || string.length === 0) {
      return;
    }

    let headers = new Headers();

    headers.append("Content-Type", "application/json");
    headers.append("authorization", token);

    const requestOptions = {
      method: "POST",
      headers: headers,
      body: JSON.stringify({ string })
    };

    fetch("/encoder", requestOptions)
      .then(response => response.json())
      .then(data => {
        this.timers.map(timer => clearTimeout(timer));
        document.getElementById("leftLine").className = "encoderLine left process";
        this.timers.push(
          setTimeout(() => {
            document.getElementById("encoder").className = "encoder process";
            this.timers.push(
              setTimeout(() => {
                document.getElementById("rightLine").className = "encoderLine right process";
                this.timers.push(
                  setTimeout(() => {
                    this.setState({ solution: data.encodedString, processing: true });
                  }, 500)
                );
              }, 1000)
            );
          }, 500)
        );
      });
  };

  handleChange = e => {
    let { processing } = this.state;

    if (processing) {
      this.timers.map(timer => clearTimeout(timer));
      document.getElementById("rightLine").className = "encoderLine right";
      this.timers.push(
        setTimeout(() => {
          document.getElementById("encoder").className = "encoder";
          this.timers.push(
            setTimeout(() => {
              document.getElementById("leftLine").className = "encoderLine left";
            }, 1000)
          );
        }, 500)
      );
    }
    this.setState({
      string: e.target.value,
      solution: "",
      processing: false
    });
  };

  render() {
    let { string, solution } = this.state;
    let { classes } = this.props;

    return (
      <div>
        <AppBar style={{ alignItems: "center" }}>
          <Toolbar>
            <Typography variant="h6">String Encoder</Typography>
          </Toolbar>
        </AppBar>

        <InputBase
          className={classes.textfield}
          placeholder="Input"
          inputProps={{ "aria-label": "naked" }}
          onChange={this.handleChange}
          value={string}
        />
        <div>
          <div id="leftLine" className="encoderLine left" />
          <div id="encoder" className="encoder" style={{ color: "#303030" }}>
            ENCODER
          </div>
          <div id="rightLine" className="encoderLine right" />
        </div>

        <div className={classes.solutionDiv}>{solution}</div>

        <Button className={classes.button} variant="contained" color="primary" onClick={this.encode}>
          Encode
        </Button>
      </div>
    );
  }
}

export default withStyles(styles)(Encoder);
