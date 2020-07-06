import React, { Component } from "react";
import {
  Card,
  Segment,
  Fragment,
  Grid,
  Header,
  Search,
} from "semantic-ui-react";
import { connect } from "react-redux";
import assets from "./assets/images/banner.png";
import HomePageCard from "./HomePageCard";

class MainContainer extends Component {
  render() {
    return (
      <Grid columns={2} stackable className="fill-content">
        <Segment>
          <img class="ui fluid image" src={assets} />

          <div class="ui inverted stripe segment">
            <Header padded="very" size="huge" textAlign="center">
              RENT FROM THOSE WHO KNOW THEIR INSTRUMENT BEST
            </Header>
          </div>
          <br></br>

          <Header textAlign="center" size="huge">
            FEATURED RENTALS
          </Header>
          <br></br>

          <Card.Group itemsPerRow={4}>
            {this.props.listings === undefined
              ? null
              : this.props.listings.map((listing) => {
                  return (
                    <HomePageCard
                      key={listing.id}
                      listing={listing}
                      history={this.props.history}
                    />
                  );
                })}
          </Card.Group>
        </Segment>
      </Grid>
    );
  }
}

function mapStateToProps(state) {
  return {
    listings: state.listings,
    ratings: state.ratings,
  };
}

export default connect(mapStateToProps)(MainContainer);
