import React, { Component } from 'react';
import ShowPage from './ShowPage'
import { Card, Image, Button, Label} from 'semantic-ui-react'
import {Link} from 'react-router-dom'


class ListingCard extends Component {

  handleClick = event => {
    fetch(`http://localhost:3000/listings/${this.props.listing.id}`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
    .then(response => response.json())
    this.props.history.push(`/listings/${this.props.listing.id}`)
  }


  render() {
    return (

        <Card onClick={this.handleClick} key={this.props.listing.id} >
            <Card.Content textAlign="center">
              <Card.Header textAlign="center">{this.props.listing.instrument_name}</Card.Header>
              <Image centered src={this.props.listing.image} size='small'/>
            <Card.Description textAlign="centered">
              <p>{this.props.listing.description}</p>
              <p>Price/per day: ${this.props.listing.price}</p>

              {
                this.props.listing.rented
                ?
                <Label as='a' basic color="red" pointing>
                  Not Available
                </Label>
                :
                <Label as='a' color="yellow" ribbon>
                  Rent!
                </Label>
              }
            </Card.Description>
          </Card.Content>
        </Card>

    );
  }

}


export default ListingCard;
