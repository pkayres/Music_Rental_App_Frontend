import React, { Component } from 'react'
import { connect } from 'react-redux'
import {Link} from 'react-router-dom'
import { Card, Image, Button, Grid, Label, Segment, Header, Icon } from 'semantic-ui-react'

class CategoryCard extends Component {


  render() {
    console.log(this.props)
    return (

        <Grid columns={2} stackable className="fill-content">
            <div class="ui inverted stripe segment">
              <Header size='huge' textAlign='center'>RENTALS</Header>
            </div>
          <Card.Group itemsPerRow={4} >
        {
          this.props.listings.map(listing => {
          if(listing.category === this.props.category){
            return  (
              <Card key={listing.id} >
                  <Card.Content textAlign="center">
                    <Card.Header textAlign="center">{listing.instrument_name}</Card.Header><br></br>
                      <div>
                        <Link to ={`/listings/${listing.id}`}>
                          <Image centered src={listing.image} size='medium' rounded/>
                        </Link>
                      </div>
                  <Card.Description textAlign="centered"><br></br>
                    <Header size="small">DESCRIPTION</Header>
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
                  {
                    listing.rented
                    ?
                    null
                    :
                    <Header color="green" size="medium">
                        ${listing.price} per/day </Header>

                  }
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

export default connect(mapStateToProps,mapDispatchToProps)(CategoryCard);
