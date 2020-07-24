import React, { Component } from "react";
import { Link } from "react-router-dom";
import { signin, signInWithGoogle, signInWithGitHub } from "../helpers/auth";
import { TextField, Button, Grid } from '@material-ui/core';


export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      email: "",
      password: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }
  async handleSubmit(event) {
    event.preventDefault();
    this.setState({ error: "" });
    try {
      await signin(this.state.email, this.state.password);
    } catch (error) {
      this.setState({ error: error.message });
    }
  }
  render() {
    return (
      <Grid container justify="center" className="container">
        <Grid item sm={8} className="form__container">
          <form
            autoComplete="off"
            onSubmit={this.handleSubmit}
            className="form__field"
          >
          <h1>
            Login to
            <Link to="/">
              Chatty
            </Link>
          </h1>
          <p>
            Fill in the form below to login to your account.
          </p>
          <div>
            <TextField
              placeholder="Email"
              name="email"
              type="email"
              variant="outlined"
              size="small"
              onChange={this.handleChange}
              value={this.state.email}
            />
          </div>
          <div>
            <TextField
              placeholder="Password"
              name="password"
              variant="outlined"
              size="small"
              onChange={this.handleChange}
              value={this.state.password}
              type="password"
            />
          </div>
          <div className="btn__field">
            {this.state.error ? (
              <p>{this.state.error}</p>
            ) : null}
            <Button 
             type="submit" 
             variant="outlined" 
             className="btn" 
             color="primary" 
             >Login</Button>
          </div>
          <hr />
          <p>
            Don't have an account? <Link to="/signup">Sign up</Link>
          </p>
        </form>
        </Grid>
      </Grid>
    );
  }
};

const style = {
  display: 'flex',
  justifyContent:'center'
}