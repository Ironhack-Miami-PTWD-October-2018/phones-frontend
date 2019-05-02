import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import EditPhone from './EditPhone';

class PhoneDetails extends Component {
    constructor(props){
        super(props);
        this.state = {
            showEdit: false,
            // we need the initial "specs" array to avoid an error with ".map()"
            specs: [],
        };
    }

    // React will call "componentDidMount()" automatically when PhoneDetails loads
    componentDidMount(){
        // console.log(' = == = = =', this.props.match.params);
        const { params } = this.props.match;

        axios.get(process.env.REACT_APP_SERVER_URL + `/api/phones/${params.phoneId}`)
        .then(responseFromApi => {
            // console.log('this is res: ', responseFromApi);
            this.setState(responseFromApi.data);
        })
        .catch(err => console.log(err));
    }

    showEditForm(){
        this.setState({ showEdit: true });   
    }

    deletePhone(id){
        axios.delete(process.env.REACT_APP_SERVER_URL + `/api/phones/${id}`)
        .then(responseFromApi => {
            this.props.history.push('/phone-list'); 
        })
        .catch(err => console.log(err));
    }

    render(){
        // console.log('state: ', this.state);
        const { _id, brand, model, price, image, specs, createdAt } = this.state;
        return (
            <section>

                { this.state.showEdit ? <EditPhone thePhone={ this.state } { ...this.props }  /> : (
                    <section>
                        {/* <p> This is details page! </p> */}
                        <h2> { model } by { brand } </h2>
                        <p> <b> $ { price } </b> </p>
                        <img src={ image } alt={ model } width="200"/>
                        <ul>
                            { specs.map((oneSpec, index) => {
                                return <li key={ index }> { oneSpec } </li>
                            }) }
                        </ul>
                        <p>  Product ID: { _id }</p>
                        <p> Added on: { createdAt } </p>
                        {/* {this.showEditForm()} */}
                        <button onClick={() => this.showEditForm()}>Edit phone</button>
                        <button onClick={() => this.deletePhone(_id)}>Delete</button>
                    </section>
                    
                ) }
              
                <Link to={"/phone-list"}>Go to phones page </Link>
            </section>
        )
    }
}

export default PhoneDetails;