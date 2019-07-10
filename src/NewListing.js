import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { Form, Button, TextArea, Header } from 'semantic-ui-react'

class NewListing extends Component {


    state = {
      user: this.props.currentUser !== null ? this.props.currentUser.id : null,
      renter: null,
      category: '',
      rented: false,
      image: '',
      instrument_name: '',
      description: '',
      user_notes:'',
      price: 0,
    }

    handleChange = (event) => {
      this.setState({
        [event.target.name]: event.target.value
      })
    }

    handleSubmit = (event) => {
      event.preventDefault();
  		fetch("http://localhost:3000/listings", {
  			method: "POST",
  			headers: {
  				"Content-Type": "application/json",
  				"Accepts": "application/json",
  			},
  			body: JSON.stringify({
          "user_id": this.state.user,
          "renter": this.state.renter,
          "rented": this.state.rented,
          "category": this.state.category,
          "image": this.state.image,
          "instrument_name": this.state.instrument_name,
          "description": this.state.description,
          "user_notes": this.state.user_notes,
          "price": this.state.price
        })
  		})
  		.then(res => res.json())
  		.then(newlisting => {
  		    this.props.newListing(newlisting)
          this.props.history.push(`/users/${newlisting.user_id}`)
  		})
  	}



    render() {
      return (
        <div>

        <Header size='huge'>Create New Rental</Header>
        <br>
        </br>
        <Form size="huge" onSubmit={this.handleSubmit}>
        <Form.Field >
          <label>Instrument name:</label>
          <input placeholder="Instrument Name" name="instrument_name" required="required" value={this.state.instrument_name} onChange={this.handleChange}/>
        </Form.Field>
        <Form.Field >
        <div class="ui form">
          <div class="field">
            <select name="category" onChange={this.handleChange}>
              <option value="">Instrument Type</option>
              <option value="guitars">Guitars</option>
              <option value="basses">Basses</option>
              <option value="drums">Drums</option>
              <option value="brass">Brass</option>
              <option value="keyboards">Keyboards</option>
            </select>
          </div>
        </div>
        </Form.Field>
        <Form.Field>
          <label>Image:</label>
          <input placeholder="Image URL" name="image" required="required" value={this.state.image} onChange={this.handleChange}/>
        </Form.Field>
        <Form.Field>
          <label>Description of Instrument:</label>
          <textarea placeholder="Description" name="description" required="required" value={this.state.description} onChange={this.handleChange} />
        </Form.Field>
        <Form.Field>
          <label>Any specific notes for renters? </label>
           <textarea placeholder="Renter notes" name="user_notes" required="required" value={this.state.user_notes} onChange={this.handleChange} />
        </Form.Field>
        <Form.Field>
          <label>Price per day:</label>
           <input type='number' placeholder="Price" name="price" required="required" value={this.state.price} onChange={this.handleChange} />
        </Form.Field>
          <Button color="blue" type="submit">Submit </Button>
        </Form>
      </div>
      );
    }

  }

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser,
    listings: state.listings,
  }
}

function mapDispatchToProps(dispatch){
  return {
    newListing:(newListing) => {
      dispatch({ type: "NEW_LISTING", payload: newListing})
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewListing)
