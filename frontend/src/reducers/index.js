import { combineReducers } from 'redux'
import * as types from '../actions/actionTypes'

const initialState = {
  categories: [],
  posts: [],
  comments: []
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

function commentReducer (state = initialState.comments, action) {
  const { comments, type, comment } = action
  let index
  switch(type) {
    case types.GET_COMMENTS:
      return [...comments]
    case types.ADD_COMMENT:
      return [
        ...state,
        comment
      ]
    case types.EDIT_COMMENT:
      index = state.findIndex(obj => obj.id === comment.id)
      return [
        ...state.slice(0,index),
        {
          ...state[index],
          body: comment.body,
          timestamp: comment.timestamp
        },
        ...state.slice(index + 1)
      ]
    case types.DELETE_COMMENT:
      index = state.findIndex(obj => obj.id === comment.id)
      return [
        ...state.slice(0,index),
        ...state.slice(index + 1)
      ]
    case types.VOTE_COMMENT:
      index = state.findIndex(obj => obj.id === comment.id)
      return [
        ...state.slice(0,index),
        {
          ...state[index],
          voteScore: comment.voteScore
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
  comments: commentReducer,
})

export default rootReducer