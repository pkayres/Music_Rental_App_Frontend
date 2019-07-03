import React, { Component } from 'react';
import { connect } from 'react-redux'
import {Link} from 'react-router-dom'
import { Card, Image, Button, Grid } from 'semantic-ui-react'

class Keyboards extends Component {
  render() {
    return (
      <div>
      <h1>Keyboards</h1>
        {
          this.props.listings.map(listing => {
          if(listing.category === "keyboards"){
            return <Card.Group centered>
              <Link to ={`/listings/${listing.id}`}>
                 <Card key={listing.id}>
                   <Card.Content>
                     <Image src={listing.image} floated='right' size='small'/>
                     <Card.Header>{listing.instrument_name}</Card.Header>
                     <Card.Description>
                       <p>Price: ${listing.price}</p>
                         {
                           listing.rented
                           ?
                           <Button color="red">Not Available</Button>
                           :
                           <Button color="yellow">Rent!</Button>
                         }
                     </Card.Description>
                   </Card.Content>
                 </Card>
                </Link>
               </Card.Group>
          }
        })
      }
      </div>
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

export default connect(mapStateToProps,mapDispatchToProps)(Keyboards);
