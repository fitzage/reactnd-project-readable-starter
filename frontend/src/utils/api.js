const token = 'tsthststhshsth'
const url = 'http://localhost:3001'

const headers = {
  'Content-Type': 'application/json',
  'Authorization': token,
}

// API functions for getting data
export const getCategories = () =>
  fetch(`${url}/categories`, { headers })
    .then(res => res.json())
    .then(data => data.categories)

export const getPosts = (category) => {
  // Determine if a category has been passed. If not, get all posts.
  const apiUrl = (category ? `${url}/${category}/posts` : `${url}/posts`)
  return fetch(`${apiUrl}`, { headers })
    .then(res => res.json())
  }

export const getPost = (id) =>
  fetch(`${url}/posts/${id}`, { headers })
    .then(res => res.json())

export const getComments = (id) =>
  fetch(`${url}/posts/${id}/comments`, { headers })
    .then(res => res.json())

export const getComment = (id) =>
  fetch(`${url}/comments/${id}`, { headers })
    .then(res => res.json())

// API functions for posting data
export const addPost = (post) =>
  fetch(`${url}/posts`, { method: 'POST', body: JSON.stringify(post), headers})
    .then(res => res.json())

export const votePost = (id, vote) =>
  fetch(`${url}/posts/${id}`, { method: 'POST', body: JSON.stringify(vote), headers})
    .then(res => res.json())

export const addComment = (comment) =>
  fetch(`${url}/comments`, { method: 'POST', body: JSON.stringify(comment), headers})
    .then(res => res.json())

export const voteComment = (id, vote) =>
  fetch(`${url}/comments/${id}`, { method: 'POST', body: JSON.stringify(vote), headers})
    .then(res => res.json())

// API functions for editing data
export const editPost = (id, post) =>
  fetch(`${url}/posts/${id}`, { method: 'PUT', body: JSON.stringify(post), headers})
    .then(res => res.json())

export const editComment = (id, comment) =>
  fetch(`${url}/comments/${id}`, { method: 'PUT', body: JSON.stringify(comment), headers})
    .then(res => res.json())

// API functions for deleting data
export const deletePost = (id) =>
  fetch(`${url}/posts/${id}`, { method: 'DELETE', headers})
    .then(res => res.json())

export const deleteComment = (id) =>
  fetch(`${url}/comments/${id}`, { method: 'DELETE', headers})
    .then(res => res.json())
