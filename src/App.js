import React, { Component } from 'react';
import './App.css';
import { Switch, Route, Redirect } from 'react-router-dom'
import Login from './Login'
import NavBar from './NavBar'
import SignUp from './SignUp'
import { connect } from 'react-redux'
import { Grid, Header, Divider, Image, Segment } from 'semantic-ui-react'
import MainContainer from './MainContainer'
import Profile from './Profile'
import Guitars from './Guitars'
import Basses from './Basses'
import Brass from './Brass'
import Keyboards from './Keyboards'
import Drums from './Drums'
import ShowPage from './ShowPage'
import NewListing from './NewListing'



class App extends Component {


  componentDidMount = () => {
    const token = localStorage.getItem('token')
    if(token){
      fetch('http://localhost:3000/autoLogin', {
        headers: {
          "Authorization": token
        }
      })
      .then(resp => resp.json())
      .then(response => {
				if (response.errors){
					localStorage.removeItem("user_id")
					alert(response.errors)
				} else {
					this.props.setCurrentUser(response)
				}
			})
		}
      fetch('http://localhost:3000/listings')
      .then(resp => resp.json())
      .then(listings => {
         this.props.getListings(listings)
      })
      fetch('http://localhost:3000/ratings')
      .then(resp => resp.json())
      .then(ratings => {
         this.props.getRatings(ratings)
      })
      fetch('http://localhost:3000/rents')
      .then(resp => resp.json())
      .then(rental => {
        this.props.setUserRentals(rental)
      })

	}



  render(){
    return (
      <Grid>

      <NavBar currentUser={this.props.currentUser} logOut={this.props.logOut}/>

        <Grid.Row centered>


          <Switch>
              <Route path="/listings/:id" component={ShowPage}/>
    					<Route path="/login" component={Login}/>
              <Route path="/signup" component={SignUp} />
              <Route path="/home" component={MainContainer}/>
              <Route path="/users/:id" component={Profile}/>
              <Route path="/guitars" component={Guitars}/>
              <Route path="/drums" component={Drums}/>
              <Route path="/basses" component={Basses}/>
              <Route path="/keyboards" component={Keyboards}/>
              <Route path="/brass" component={Brass}/>
              <Route path="/newlisting" component={NewListing}/>
              <Route render={() => <Redirect to = "/home"/>}/>
    			</Switch>
        </Grid.Row>
      </Grid>
    );
  }
} //End of Component

//Reading to state

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser,
    listings: state.listings,
    ratings: state.ratings
  }
}

//adding to state

function mapDispatchToProps(dispatch){
  return {
    setCurrentUser:(userObj) => {
      dispatch({ type: "SET_CURRENT_USER", payload: userObj})
    },
    logOut:() => {
      localStorage.clear();
      dispatch({type: "LOG_OUT"})
    },
    getListings:(listing) => {
      dispatch({ type: "GET_LISTING", payload: listing})
    },
    getRatings:(ratings) => {
      dispatch({ type: "GET_RATINGS", payload: ratings})
    },
    setUserRentals:(rental) => {
      dispatch({ type: "SET_USER_RENTALS", payload: rental})
    }

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
