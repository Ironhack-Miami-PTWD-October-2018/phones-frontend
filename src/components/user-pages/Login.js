import React, { Component } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";

class LoginPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      originalPassword: "",
      message: null,
    };
  }

  genericSync(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handleSubmit(event) {
    event.preventDefault();

    axios.post(
      process.env.REACT_APP_SERVER_URL + "/api/login",
      this.state,
      { withCredentials: true } // FORCE axios to send cookies across domains
    )
      .then(response => {
        console.log("Login Page", response.data);
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
    // ✅ to be added
    if (this.props.currentUser) {
      console.log(this.props.currentUser)
      return <Redirect to="/phone-list" />
    }

    return (
      <section className="LoginPage">
        <h2>Log In</h2>

        <form onSubmit={event => this.handleSubmit(event)}>
          <label>
            Email:
            <input 
                value={this.state.email}
                onChange={event => this.genericSync(event)}
                type="email" 
                name="email" 
                placeholder="rey@jedi.com" 
            />
          </label>

          <label>
            Password:
            <input 
                value={this.state.originalPassword}
                onChange={event => this.genericSync(event)}
                type="password" 
                name="originalPassword" 
                placeholder="****"
            />
          </label>

          <button>Log In</button>
        </form>
      </section>
    );
  }
}

export default LoginPage;
