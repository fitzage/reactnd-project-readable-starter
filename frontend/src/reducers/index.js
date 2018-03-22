import { combineReducers } from 'redux'
import * as types from '../actions/actionTypes'

const initialState = {
  categories: [],
  posts: []
}

function categoryReducer(state = initialState.categories, action) {
  switch(action.type) {
    case types.LOAD_CATEGORIES_SUCCESS:
      return action.categories
    default:
      return state
  }
}

const rootReducer = combineReducers({
  categoryReducer
})

export default rootReducer