import React, { Component } from 'react';
import { auth } from "../services/firebase";
import { db } from "../services/firebase"
import { TextField, Button, Grid } from '@material-ui/core';
import { Redirect } from 'react-router-dom';


class Chat extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            user: auth().currentUser,
            chats: [],
            content: '',
            readError: null,
            writeError: null,
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
    }


    async componentDidMount() {
        this.setState({ readError: null});
        try {
            db.ref("chats").on("value", snapshot => {
                let chats = [];
                snapshot.forEach((snap) => {
                    chats.push(snap.val());
                });
                this.setState({ chats });
            });
        } catch (error) {
            this.setState({ readError: error.message });
        }
    }

    handleChange = (event) => {
        this.setState({
          content: event.target.value
        });
    }

    async handleSubmit(event) {
        event.preventDefault();
        this.setState({ writeError: null });
        try {
          await db.ref("chats").push({
            content: this.state.content,
            timestamp: Date.now(),
            uid: this.state.user.uid,
            email: this.state.user.email
          });
          this.setState({ content: '' });
        } catch (error) {
          this.setState({ writeError: error.message });
        }
    }

    async handleLogout() {
        await auth().signOut();
        return <Redirect to='/' />;
    }

    render() { 
        return ( 
            <Grid container justify="center">
                <Grid item sm={8} xm={12} className="chat__container">
                <div className="chats">
                    {this.state.chats.slice(-15).map(chat => {
                    return (
                        chat.uid === this.state.user.uid ? 
                        <p className="chat__right" key={chat.timestamp}>{chat.content}</p>
                        :
                        <p className="chat__left" key={chat.timestamp}>{chat.content}</p>
                    )
                    })}
                </div>
                <form className="msg__field" onSubmit={this.handleSubmit}>
                    <TextField 
                     onChange={this.handleChange} 
                     value={this.state.content}
                     variant="outlined"
                     size="small" 
                     />
                    {this.state.error ? <p>{this.state.writeError}</p> : null}
                    <Button variant="outlined" type="submit">Send</Button>
                </form>
                <div>
                    Login in as: <strong>{this.state.user.email}</strong>
                    <Button color="secondary" variant="contained" onClick={this.handleLogout}>Logout</Button>
                </div>
                </Grid>
            </Grid>
         );
    }
}
 
export default Chat;