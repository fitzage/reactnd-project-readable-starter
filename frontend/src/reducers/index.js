import { combineReducers } from 'redux'
import * as types from '../actions/actionTypes'

const initialState = {
  categories: [],
  posts: []
}

function categoryReducer (state = initialState.categories, action) {
  const { categories, type } = action
  switch(type) {
    case types.LOAD_CATEGORIES:
      return [...categories]
    default:
      return state
  }
}

function postsReducer (state = initialState.posts, action) {
  const { posts, type, post } = action
  let index
  switch(type) {
    case types.LOAD_POSTS:
      return [...posts]
    case types.VOTE_POST:
      index = state.findIndex(obj => obj.id === post.id)
      return [
        ...state.slice(0,index),
        {
          ...state[index],
          voteScore: post.voteScore
        },
        ...state.slice(index + 1)
      ]
    case types.DELETE_POST:
      index = state.findIndex(obj => obj.id === post.id)
      return [
        ...state.slice(0,index),
        ...state.slice(index + 1),
      ]
    case types.ADD_POST:
      return [
        ...state,
        post
      ]
    case types.EDIT_POST:
      index = state.findIndex(obj => obj.id === post.id)
      return [
        ...state.slice(0,index),
        {
          ...state[index],
          title: post.title,
          body: post.body
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