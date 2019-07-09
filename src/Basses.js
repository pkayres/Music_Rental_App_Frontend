import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Card, Image, Button, Grid, Header, Label} from 'semantic-ui-react'
import {Link} from 'react-router-dom'

class Basses extends Component {
  render() {
    return (
      <Grid columns={2} stackable className="fill-content">
        <div class="ui inverted stripe segment">
          <Header size='huge' textAlign='center'>Bass Rentals </Header>
        </div>
        <Card.Group itemsPerRow={4} >

      {
        this.props.listings.map(listing => {
        if(listing.category === "basses"){
          return  (
            <Link to ={`/listings/${listing.id}`}>
               <Card key={listing.id}>
                 <Card.Content textAlign="center">
                   <Card.Header textAlign="center">{listing.instrument_name}</Card.Header>
                   <Image centered src={listing.image} size='small'/>
                   <Card.Description>
                     <p>{listing.description}</p>
                     <p>Price/per day:${listing.price}</p>
                       {
                         listing.rented
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
            </Link>
          );
        }
      })
    }

    </Card.Group>
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

export default connect(mapStateToProps, mapDispatchToProps)(Basses);
