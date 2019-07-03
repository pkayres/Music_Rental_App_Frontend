import React, { Component } from 'react';
import { Card, Image, Button, Grid, Divider, Segment } from 'semantic-ui-react'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'

class Rent extends Component {

  render() {
    return (
      <div>
        this is the rent page
      </div>
    );
  }

}

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser,
    listings: state.listings,
    ratings: state.ratings,
    userRentals: state.userRentals
  }
}



export default connect(mapStateToProps)(Rent)
