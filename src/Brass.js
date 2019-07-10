import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Card, Image, Button, Grid, Header, Label, Icon } from 'semantic-ui-react'
import {Link} from 'react-router-dom'

class Brass extends Component {
  render() {
    return (
      <Grid columns={2} stackable className="fill-content">
        <div class="ui inverted stripe segment">
          <Header size='huge' textAlign='center'> Brass Rentals </Header>
        </div>
        <Card.Group itemsPerRow={4}  >

      {
        this.props.listings.map(listing => {
        if(listing.category === "brass"){
          return  (
               <Card key={listing.id}>
                   <Card.Content textAlign="center">
                     <Card.Header textAlign="center">{listing.instrument_name}</Card.Header>
                       <div>
                         <Link to ={`/listings/${listing.id}`}>
                           <Image centered src={listing.image} size='small'/>
                         </Link>
                       </div>
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
                         <Button as='a' color="yellow">
                           Rent!
                         </Button>
                       }
                   </Card.Description>
                 </Card.Content>
                 <Card.Content extra>
                   <a>
                     <Icon name='dollar sign' />
                     {listing.price} per/day
                   </a>
                 </Card.Content>
               </Card>
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

export default connect(mapStateToProps) (Brass);
