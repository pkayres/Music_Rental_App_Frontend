import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Card, Image, Button, Grid, Header, Label, Segment, Icon } from 'semantic-ui-react'
import {Link} from 'react-router-dom'

class Drums extends Component {
  render() {
    return (
      <Grid columns={2} stackable className="fill-content">
        <Segment>
          <div class="ui inverted stripe segment">
            <Header size='huge' textAlign='center'>Drum Rentals </Header>
          </div>
        <Card.Group itemsPerRow={4} >

      {
        this.props.listings.map(listing => {
        if(listing.category === "drums"){
          return  (
            <Card key={listing.id} >
                <Card.Content textAlign="center">
                  <Card.Header textAlign="center">{listing.instrument_name}</Card.Header><br></br>
                    <div>
                      <Link to ={`/listings/${listing.id}`}>
                        <Image centered src={listing.image} size='small'/>
                      </Link>
                    </div>
                <Card.Description textAlign="centered">
                  <p>{listing.description}</p>
                </Card.Description>
              </Card.Content>
              <Card.Description>
                {
                  listing.rented
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
                  {listing.price} per/day
                </a>
              </Card.Content>
            </Card>
          );
        }
      })
    }

    </Card.Group>
  </Segment>
  </Grid>
    );
  }
}

function mapStateToProps(state) {
  return {
    listings: state.listings,
  }
}

function mapDispatchToProps(dispatch){
  return {
    rentInstrument:(id) => {
      dispatch({ type: "RENT_INSTRUMENT", payload: id})
    }
  }
}

export default connect(mapStateToProps)(Drums);
