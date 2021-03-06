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

export function loadCommentCount(id) {
  return function(dispatch) {
    return postsAPI.getPost(id).then(post => {
      dispatch(loadCommentCountSuccess(post))
    })
  }
}

export function loadCommentCountSuccess(post) {
  return {
    type: types.LOAD_COMMENT_COUNT,
    post
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

export function getComments(id) {
  return function(dispatch) {
    return postsAPI.getComments(id).then(comments => {
      dispatch(getCommentsSuccess(comments))
    })
  }
}

export function getCommentsSuccess(comments) {
  return {
    type: types.GET_COMMENTS,
    comments
  }
}

export function addComment(comment) {
  return function(dispatch) {
    return postsAPI.addComment(comment).then(comment => {
      dispatch(addCommentSuccess(comment))
    })
  }
}

export function addCommentSuccess(comment) {
  return {
    type: types.ADD_COMMENT,
    comment
  }
}

export function editComment(values) {
  return function(dispatch) {
    return postsAPI.editComment(values).then(comment => {
      dispatch(editCommentSuccess(comment))
    })
  }
}

export function editCommentSuccess(comment) {
  return {
    type: types.EDIT_COMMENT,
    comment
  }
}

export function deleteComment(commentId) {
  return function(dispatch) {
    return postsAPI.deleteComment(commentId).then(comment => {
      dispatch(deleteCommentSuccess(comment))
    })
  }
}

export function deleteCommentSuccess(comment) {
  return {
    type: types.DELETE_COMMENT,
    comment
  }
}

export function voteComment(commentId, vote) {
  return function(dispatch) {
    return postsAPI.voteComment(commentId, vote).then(comment => {
      dispatch(voteCommentSuccess(comment))
    })
  }
}

export function voteCommentSuccess(comment) {
  return {
    type: types.VOTE_COMMENT,
    comment
  }
}