import React, { Component } from 'react';
import ShowPage from './ShowPage'
import { Card, Image, Button, Label, Icon} from 'semantic-ui-react'
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
              <Card.Header textAlign="center">{this.props.listing.instrument_name}</Card.Header><br></br>
              <Image src={this.props.listing.image} size='small'/>
            <Card.Description textAlign="centered">
              <p>{this.props.listing.description}</p>
            </Card.Description>
          </Card.Content>
          <Card.Description>
            {
              this.props.listing.rented
              ?
              <Label as='a' basic color="red" ribbon="left">
                Not Available
              </Label>
              :
              <Label as='a' color="yellow" ribbon="left">
                Rent
              </Label>
            }
          </Card.Description>
          <Card.Content extra>
            <a>
              <Icon color="green" name='dollar sign' />
              {this.props.listing.price} per/day
            </a>
          </Card.Content>
        </Card>
    );
  }

}


export default ListingCard;
