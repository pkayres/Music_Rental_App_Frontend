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
    .then(response => console.log(response))
    this.props.history.push(`/listings/${this.props.listing.id}`)
  }


  render() {
    return (

        <Card onClick={this.handleClick} key={this.props.listing.id} >
          <Card.Content>
            <Card.Header>{this.props.listing.instrument_name}</Card.Header>
            <Image src={this.props.listing.image} floated='right' size='small'/>
            <Card.Description>
              <p>Price/per day: ${this.props.listing.price}</p>
              {
                this.props.listing.rented
                ?
                <Label as='a' color="red" tag>
                  Not Available
                </Label>
                :
                <Label as='a' color="yellow" tag>
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
