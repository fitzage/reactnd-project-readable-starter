import * as postsAPI from '../utils/api'
import * as types from './actionTypes'

export function loadCategories() {
  return function(dispatch) {
    return postsAPI.getCategories().then(categories => {
      dispatch(loadCategoriesSuccess(categories))
    })
  }
}

export function loadCategoriesSuccess(categories) {
  return {
    type: types.LOAD_CATEGORIES_SUCCESS,
    categories
  }
}

export function loadPosts() {
  return function(dispatch) {
    return postsAPI.getPosts().then(posts => {
      dispatch(loadPostsSuccess(posts))
    })
  }
}

export function loadPostsSuccess(posts) {
  return {
    type: types.LOAD_POSTS_SUCCESS,
    posts
  }
}

export function votePost(postId, vote) {
  return function(dispatch) {
    return postsAPI.votePost(postId, vote).then(post => {
      dispatch(votePostSuccess(post))
    })
  }
}

export function votePostSuccess(post) {
  return {
    type: types.VOTE_POST,
    post
  }
}
