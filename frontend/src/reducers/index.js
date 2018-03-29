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
  const { posts, type, post } = action
  switch(type) {
    case types.LOAD_POSTS_SUCCESS:
      return [...posts]
    case types.VOTE_POST:
      const index = state.findIndex(obj => obj.id === post.id)
      return [
        ...state.slice(0,index),
        {
          ...state[index],
          voteScore: post.voteScore
        },
        ...state.slice(index + 1)
      ]
    default:
      return state
  }
}

const rootReducer = combineReducers({
  categories: categoryReducer,
  posts: postsReducer,
})

export default rootReducer