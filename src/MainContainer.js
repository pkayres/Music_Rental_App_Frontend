import React, { Component } from 'react';
import { Card} from 'semantic-ui-react'
import { connect } from 'react-redux'

import ListingCard from './ListingCard'

class MainContainer extends Component {

  render() {
        return (
        <Card.Group itemsPerRow={4}>
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
