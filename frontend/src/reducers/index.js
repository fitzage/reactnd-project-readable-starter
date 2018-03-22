import { combineReducers } from 'redux'
import * as types from '../actions/actionTypes'

const initialState = {
  categories: [],
  posts: []
}

function categoryReducer (state = initialState.categories, action) {
  const { categories, type } = action
  switch(type) {
    case types.LOAD_CATEGORIES_SUCCESS:
      return [...categories]
    default:
      return state
  }
}

const rootReducer = combineReducers({
  categories: categoryReducer,
})

export default rootReducer