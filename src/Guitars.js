import React, { Component } from 'react';
import { connect } from 'react-redux'
import {Link} from 'react-router-dom'
import { Card, Image, Button, Grid, Label, Segment, Header } from 'semantic-ui-react'

class Guitars extends Component {


  render() {
    return (

      <Grid columns={2} stackable className="fill-content">
          <Segment>
            <div class="ui inverted stripe segment">
              <Header size='huge' textAlign='center'>Guitar Rentals </Header>
            </div>
          <Card.Group itemsPerRow={4} >

        {
          this.props.listings.map(listing => {
          if(listing.category === "guitars"){
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

export default connect(mapStateToProps,mapDispatchToProps)(Guitars);
