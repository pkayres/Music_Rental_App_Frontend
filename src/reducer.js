const defaultState = {
  currentUser: null,
  listings: [],
  ratings: [],
  userRentals: [],
  addedToUserRental: false
}


function reducer (state= defaultState, action){
  switch(action.type){
    case "SET_CURRENT_USER":
      return {...state, currentUser: action.payload}
    case "LOG_OUT":
      return {...state, currentUser: null}
    case "GET_LISTING":
      return {...state, listings:  action.payload}
    case "ADD_RATING":
      return {
          ...state,
          ratings: [...state.ratings, action.payload]
      }
    case "GET_RATINGS":
      return {...state, ratings: action.payload}
    case "RENT_INSTRUMENT":
      const match = state.listings.map(listing => {
        if(listing.id === action.payload){
          listing.rented = true
          return listing
        } else{
          return listing
        }
      })

      return {...state, listings: match}
    case "SET_USER_RENTALS":
      const rentals = action.payload.map(rent => {
            return rent.listing
        })
      return {
          ...state,
          userRentals: rentals
      }
    case "ADD_TO_RENTALS":
      const matchRental = state.listings.map(listing => {
        if(listing.user_id !== action.payload.user_id)
          return listing
      })
      return {
          ...state,
          userRentals: [...state.userRentals, action.payload],
          addedToUserRental: true
      }
    case "DELETE_FROM_RENTALS":
      const listingMatch = state.userRentals.filter(listing => {
        return listing.id !== action.payload.id
      })
      return {...state, userRentals: listingMatch}
    case "CHANGE_LISTING_STATUS":
      const listingFound = state.listings.map(listing => {
        if(listing.id === action.payload.id){
            listing.rented = false
                return listing
            }
            return listing
          })
          return {...state, listings: listingFound}
    case "DELETE_FROM_COLLECTION":
      const listingRemove = state.listings.filter(listing => {
        if(listing.id !== action.payload.id){
          return listing
        }
      })
      return {...state, listings: listingRemove}
    case "DELETE_LISTING":
      const listingDel = state.currentUser.listings.filter(listing => {
        if(listing.id !== action.payload.id){
          return listing
        }
      })
    return {...state, currentUser: {...state.currentUser, listings: listingDel}}
    case "NEW_LISTING":
      return {
          ...state,
          listings: [...state.listings, action.payload]
      }
    case "CREATE_NEW_LISTING":
      return {
        ...state,
        currentUser: {...state.currentUser, listings: [...state.currentUser.listings, action.payload]}
      }
    default:
      return state
  }
}

export default reducer;
