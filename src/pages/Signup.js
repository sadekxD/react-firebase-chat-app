import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { signup, signInWithGoogle } from '../helpers/auth';
import { TextField, Button, Grid } from '@material-ui/core';
import { yellow } from '@material-ui/core/colors';


export default class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
          error: null,
          email: '',
          password: '',
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.googleSignIn = this.googleSignIn.bind(this);
    }

    handleChange(event) {
        this.setState({
          [event.target.name]: event.target.value
        });
    }

    async handleSubmit(event) {
        event.preventDefault();
        this.setState({ error: '' });
        try {
          await signup(this.state.email, this.state.password);
        } catch (error) {
          this.setState({ error: error.message });
        }
    }

    async googleSignIn() {
        try {
          await signInWithGoogle();
        } catch (error) {
          this.setState({ error: error.message });
        }
    }
      

    render() {
        return (
            <Grid container justify="center" className="container">
              <Grid item sm={8} className="form__container">
                <form onSubmit={this.handleSubmit} className="form__field">
                    <h1>
                    Sign Up to
                    <Link to="/">Chatty</Link>
                    </h1>
                    <p>Fill in the form below to create an account.</p>
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
                    {this.state.error ? <p>{this.state.error}</p> : null}
                      <Button 
                       className="btn" 
                       type="submit"
                       variant="outlined"
                       color="primary">Sign up</Button>
                    </div>
                    <hr></hr>
                    <p>Already have an account? <Link to="/login">Login</Link></p>
                    <p>Or</p>
                    <Button style={{backgroundColor: '#2196f3', color: 'white'}} onClick={this.googleSignIn} type="button">
                      Sign up with Google
                    </Button>
                </form>
              </Grid>
            </Grid>
        )
    }
}