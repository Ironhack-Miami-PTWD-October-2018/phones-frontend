import React, { Component } from "react";
import axios from "axios";

class Signup extends Component {

  constructor(props) {
    super(props);

    this.state = {
      fullName: "",
      email: "",
      originalPassword: "",
      message: null,
    };
  }

  // 🏆 this method is reusable for any form!!!
  genericSync(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handleSubmit(event) {
    event.preventDefault();

    axios.post(
      process.env.REACT_APP_SERVER_URL + "/api/signup",
      this.state,
      { withCredentials: true } // FORCE axios to send cookies across domains
    )
      .then(response => {
        // console.log("Signup Page", response.data);
        const { userDoc } = response.data;
        // send "userDoc" to the App.js function that changes "currentUser"
        this.props.onUserChange(userDoc);
      })
      .catch(err => {
        if (err.response && err.response.data) {
          // console.error("API response", err.response.data)
          return  this.setState({ message: err.response.data.message }) 
        }
      });
  }

  render() {
    // check currentUser (received from App.js)
    if (this.props.currentUser) {
      return (
        <section>
          <h2>You are signed up!</h2>
          <p>
            Welcome, {this.props.currentUser.fullName}!
            Your user ID is <b>{this.props.currentUser._id}.</b>
          </p>
        </section>
      );
    }

    return (
      <section className="SignupPage">
        <h2>Sign Up</h2>

        <form onSubmit={event => this.handleSubmit(event)}>
          <label>
            Full Name:
            <input 
              value={this.state.fullName}
              onChange={event => this.genericSync(event)}
              type="text" name="fullName" 
              placeholder="Rey" 
            />
          </label>

          <label>
            Email:
            <input 
              value={this.state.email}
              onChange={event => this.genericSync(event)}
              type="email" name="email" 
              placeholder="rey@jedi.com" 
            />
          </label>

          <label>
            Password:
            <input 
              value={this.state.originalPassword}
              onChange={event => this.genericSync(event)}
              type="password" name="originalPassword" 
              placeholder="****" 
            />
          </label>

          <button>Sign Up</button>
        </form>
        { this.state.message && <div> { this.state.message } </div> }
      </section>
    );
  }
}

export default Signup;
