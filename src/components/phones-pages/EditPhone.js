import React, { Component } from 'react';
import axios from "axios";

// import { Link } from "react-router-dom";


class EditPhone extends Component {
    constructor(props){
        super(props);
        // console.log(this.props.thePhone)
        const { model, brand, price, image, specs } = this.props.thePhone;
        this.state = {
            model,
            brand,
            price,
            image, 
            specs
        };
    }


     // for all fields except images and specs
     genericSync(event) {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    }

    syncSpecs(event, index) {
        const { specs } = this.state;
        // update the spec value at the given index
        specs[index] = event.target.value;
        // set the state with the updated specs array
        this.setState({ specs });
    }

    handleSubmit(event) {
        // stop the page refresh
        event.preventDefault();
    
        // PUT and POST requests receive a 2nd argument: the info to submit
        // (we are submitting the state we've gathered from the form)
        axios.put(
          process.env.REACT_APP_SERVER_URL + `/api/phones/${this.props.thePhone._id}`,
          this.state,
          { withCredentials: true } // FORCE axios to send cookies across domains
        )
          .then(response => {
            //   instead of using <Redirect /> we use this.props.history.push()
            this.props.history.push('/phone-list'); 
          })
          .catch(err => {
            console.log("Update Phone ERROR", err);
            alert("Sorry! Something went wrong.");
          });
      }

    render(){
        // console.log('0 000 0 0 0 00 0 ',this.props);
        // console.log(" = = = == =", this.state);
        const { model, brand, price, image, specs } = this.state;
        return (
            <section>
                <h2>Edit { model } by { brand } </h2>

                <form onSubmit={event => this.handleSubmit(event)}>
                    <label> Model: </label>
                    <input 
                        value={ model }
                        onChange={event => this.genericSync(event)}
                        type="text" 
                        name="model" 
                    />

                    <label> Brand: </label>
                    <input 
                        value={ brand }
                        onChange={event => this.genericSync(event)}
                        type="text" 
                        name="brand" 
                    />

                    <label> Price: </label>
                    <input 
                        value={ price }
                        onChange={event => this.genericSync(event)}
                        type="number" 
                        name="price" 
                    />

                    {/* <label> Image: </label>
                    <input
                        onChange={ event => this.uploadImage(event) }
                        type="file"   
                    />
                    <br /> */}
                    <img src={ image } width="200"/>

                    <br />
                    <label> Specs: </label>
                    <br />
                    <small> has to have three characters or more </small>
                    <br />
                    { specs.map((oneSpec, index) => {
                        return (
                            <input 
                                key={ index }
                                type="text"
                                value={ oneSpec }
                                onChange={ event => this.syncSpecs(event,index) }
                            />
                        );
                    })}
                    <button> Save </button>
                    
                </form> 

            </section>
        )
    }
}

export default EditPhone;