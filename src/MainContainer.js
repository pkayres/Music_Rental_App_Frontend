import React, { Component } from 'react';
import { Card, Segment, Fragment, Grid, Header } from 'semantic-ui-react'
import assets from './assets/images/banner.png'
import { connect } from 'react-redux'
import ListingCard from './ListingCard'

class MainContainer extends Component {

  render() {
    return (
    <Grid columns={2} stackable className="fill-content">
      <Segment>
          <img class="ui fluid image" src={assets}/>
            <div class="ui inverted stripe segment">

              <Header size='huge' textAlign='center'>Rent from those who know their instrument best</Header>

            </div>
          <Card.Group itemsPerRow={4} >
          {
            this.props.listings === undefined
            ?
            null
            :
            this.props.listings.map(listing => {
              return <ListingCard  key={listing.id} listing={listing} history={this.props.history} />
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
    ratings: state.ratings
  }
}

export default connect(mapStateToProps)(MainContainer);
