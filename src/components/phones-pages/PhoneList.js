import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

class PhoneList extends Component {
    constructor(props) {
      super(props);
  
      this.state = {
        // initial array is empty while we are waiting for the API results
        phoneArray: [],
      };
    }

     // React will call "componentDidMount()" automatically when PhoneList loads
    componentDidMount() {
        // retrieve the info from the API as soon as the component loads
        axios.get(
        process.env.REACT_APP_SERVER_URL + "/api/phones",
        { withCredentials: true } // FORCE axios to send cookies across domains
        )
        .then(response => {
            console.log("Phone List", response.data);
            // update our state array with the data from the API
            this.setState({ phoneArray: response.data });
        })
        .catch(err => {
            console.log("Phone List ERROR", err);
            alert("Sorry! Something went wrong.");
        });
  }

  render(){
    const { phoneArray } = this.state;
      return(
          <section>
              <h2> Phones 📱 ☎️ </h2>
              <p>Currently we have: { phoneArray.length } phones.</p>
              <ul>
                    { phoneArray.map((onePhone) => {
                      return(
                        <li key={ onePhone._id }>
                            <Link to={`/phone-details/${onePhone._id}`}> 
                              { onePhone.model } by { onePhone.brand } 
                            </Link>
                            
                            <p> $ { onePhone.price } </p>
                            <img width="150" src={ onePhone.image } alt={ onePhone.model } />
                        </li>
                  
                      )
                    })}
              </ul>
          </section>
      )
  }
}


export default PhoneList;