import React, { Component } from 'react';
import {Redirect} from 'react-router'
import { Card, Image, Button, Grid, Divider, Segment, Label, Icon, Header, Popup, Rating} from 'semantic-ui-react'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'

class ShowPage extends Component {

  rentClick = (listing) => {
      if( listing.user_id === this.props.currentUser.id){
        alert("You can't rent your own instrument!")
      } else {
        fetch('http://localhost:3000/rents', {
          method:'POST',
          headers:{
            'Content-Type':'application/json'
          },
          body: JSON.stringify({
             "listing_id": listing.id,
             "user_id": this.props.currentUser.id
            })
        }).then(response => response.json())
          .then(rent => {
            listing.rent = rent
        this.props.addToRentals(listing)
        this.props.rentInstrument(listing.id)
        this.props.history.push(`/users/${this.props.currentUser.id}`)
      })
     }
  }


  render() {
    return (
      <div>
        {
          this.props.listings.map(listing => {
            if(listing.id === parseInt(this.props.match.params.id)){
              return (
              <Card.Group>
                <Card>
                  <Card.Content>
                    <Card.Header>{listing.instrument_name}</Card.Header>
                  </Card.Content>
                    <Image src={listing.image} wrapped ui={false} />
                    <Card.Content extra>
                      <a>
                        <Icon color="green" name='dollar sign' />
                        {listing.price} per/day
                      </a>
                    </Card.Content>
                  </Card>
                  <Card>
                      <Card.Content>
                        <Card.Description>
                          <Header centered>Description</Header>
                          {listing.description}
                          <Header centered> User notes</Header>
                          {listing.user_notes}
                        </Card.Description>
                      </Card.Content>
                      <Card.Content extra>
                        {
                          listing.rented
                          ?
                          <Label color="red">Not Available</Label>
                          :
                          this.props.currentUser !== null
                          ?
                          <Button color="yellow" onClick={() => this.rentClick(listing)}>Rent!</Button>
                          :
                          <Popup
                            content='Sign up or create an account!'
                            on='click'
                            pinned
                            trigger={<Button color="yellow" content='Rent!' />}
                          />
                        }
                      </Card.Content>
                </Card>

            </Card.Group>
          )
        }})
        }
    </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser,
    listings: state.listings,
    ratings: state.ratings
  }
}

function mapDispatchToProps(dispatch){
  return {
    rentInstrument:(id) => {
      dispatch({ type: "RENT_INSTRUMENT", payload: id})
    },
    addToRentals:(rentObj) => {
      dispatch({ type: "ADD_TO_RENTALS", payload: rentObj })
    },
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(ShowPage)
