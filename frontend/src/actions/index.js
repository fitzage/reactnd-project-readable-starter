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
    type: types.LOAD_CATEGORIES,
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
    type: types.LOAD_POSTS,
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

export function deletePost(postId) {
  return function(dispatch) {
    return postsAPI.deletePost(postId).then(post => {
      dispatch(deletePostSuccess(post))
    })
  }
}

export function deletePostSuccess(post) {
  return {
    type: types.DELETE_POST,
    post
  }
}

export function addPost(post) {
  return function(dispatch) {
    return postsAPI.addPost(post).then(post => {
      dispatch(addPostSuccess(post))
    })
  }
}

export function addPostSuccess(post) {
  return {
    type: types.ADD_POST,
    post
  }
}

export function editPost(values) {
  return function(dispatch) {
    return postsAPI.editPost(values).then(post => {
      dispatch(editPostSuccess(post))
    })
  }
}

export function editPostSuccess(post) {
  return {
    type: types.EDIT_POST,
    post
  }
}