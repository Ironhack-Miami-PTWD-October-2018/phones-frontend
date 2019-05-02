import React, { Component } from 'react';
import axios from "axios";


import { Switch, NavLink, Route } from "react-router-dom";


import './App.css';

import Signup from './components/user-pages/Signup.js';
import Login from './components/user-pages/Login.js';
// import UserProfile from './components/user-pages/UserProfile.js';
import Home from "./components/Home.js";

import AddPhone from "./components/phones-pages/AddPhone.js";
import PhoneList from "./components/phones-pages/PhoneList.js";

import PhoneDetails from "./components/phones-pages/PhoneDetails.js";


import NotFound from "./components/NotFound.js";



class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: null,
    };
  }

  componentDidMount() {
    // React doesn't know at the start if we are logged-in or not
    // (but we can ask the server if we are through an API request)
    axios.get(
      process.env.REACT_APP_SERVER_URL + "/api/checkuser",
      { withCredentials: true } // FORCE axios to send cookies across domains
    )
    .then(response => {
      // console.log("Check User", response.data);
      const { userDoc } = response.data;
      this.syncCurrentUser(userDoc);
    })
    .catch(err => {
      console.log("Check User ERROR", err);
      alert("Sorry! Something went wrong.");
    });
  }

  // this is the method for updating "currentUser"
  // (must be defined in App.js since it's the owner of "currentUser" now)
  syncCurrentUser(userDoc) {
    this.setState({ currentUser: userDoc });
  }

  logoutClick() {
    axios.delete(
      process.env.REACT_APP_SERVER_URL + "/api/logout",
      { withCredentials: true } // FORCE axios to send cookies across domains
    )
    .then(() => {
      // make "currentUser" empty again (like it was at the start)
      this.syncCurrentUser(null);
    })
    .catch(err => {
      console.log("Logout ERROR", err);
      alert("Sorry! Something went wrong.");
    });
  }





  render() {
    return (
      <div className="App">
        <header>
          <h1> IronPhones </h1>
          <nav>
            {/* <NavLink exact to="/">Home</NavLink> */}
            
            { this.state.currentUser ? (
              <span>
                {/* <NavLink to="/user-profile">User Profile</NavLink> */}
                <NavLink to="/home">Home</NavLink>
                <NavLink to="/add-phone">Add a new phone </NavLink>
                <NavLink to="/phone-list">Phones </NavLink>

                <br />
                <b>{this.state.currentUser.email}</b>
                <button onClick={() => this.logoutClick()}>
                 Log Out
                </button>
            </span>
            ): (
              <span>
                <NavLink to="/signup-page"> Signup </NavLink>
                <NavLink to="/login-page"> Login </NavLink>
              </span>
            )}
          </nav>

        </header>
        <Switch>
          <Route exact path="/" component={Home} />

          <Route path="/phone-list" component={PhoneList} />
          <Route path="/phone-details/:phoneId" component={PhoneDetails} />


          {/* <Route path="/add-phone" component={AddPhone} /> */}
              <Route  path="/add-phone" render={ () =>
                <AddPhone currentUser={ this.state.currentUser } />
               }  />

          {/* <Route path="/user-profile" component={ UserProfile } /> */}
          <Route path="/signup-page" render={() => 
            <Signup currentUser={ this.state.currentUser } 
            onUserChange={userDoc => this.syncCurrentUser(userDoc)} />
          }  />
          <Route path="/login-page" render={() => 
              <Login currentUser={ this.state.currentUser } 
              onUserChange={userDoc => this.syncCurrentUser(userDoc)} />
          }  />

          {/* 404 route ALWAYS LAST */}
          <Route component={NotFound} />          
        </Switch>
       
        <footer>
          <p>
            Made with ❤️ at Ironhack
          </p>
        </footer>
      </div>
    );
  }
}

export default App;
