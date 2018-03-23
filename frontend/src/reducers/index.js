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

function postsReducer (state = initialState.posts, action) {
  const { posts, type } = action
  switch(type) {
    case types.LOAD_POSTS_SUCCESS:
      return [...posts]
    default:
      return state
  }
}

const rootReducer = combineReducers({
  categories: categoryReducer,
  posts: postsReducer,
})

export default rootReducer