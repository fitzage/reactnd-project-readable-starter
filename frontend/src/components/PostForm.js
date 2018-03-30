import React, { Component } from 'react'
import { Route, Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import serializeForm from 'form-serialize'
import uuid from 'uuid'
import { addPost, editPost } from '../actions'

const uuidv1 = require('uuid/v1')
class PostForm extends Component {
  state = {
    id: uuidv1(),
    timestamp: (new Date).getTime(),
    title: '',
    body: '',
    author: '',
    category: '',
  }
  handleSubmit = (e) => {
    e.preventDefault()
    let values = serializeForm(e.target,{hash: true})
    this.props.closePostModal()
    if (this.props.postId) {
      this.props.editPost(values)
    } else {
      values.timestamp = this.state.timestamp
      this.props.addPost(values)
    }
  }
  componentDidMount() {
    if (this.props.postId) {
      const post = this.props.posts.find((post) => post.id === this.props.postId)
      this.setState({
        id: post.id,
        title: post.title,
        body: post.body,
        author: post.author,
        category: post.category
      })
    }
  }
  updatePostData(name, value) {
    console.log(value)
    let obj = {};
    obj[name] = value
    this.setState(obj)
  }
  /* TODO: refactor this so editing works (not as many fields are needed when editing) */
  render() {
    const { posts, postId } = this.props
    const { id, timestamp, title, body, author, category } = this.state
    return (
      <div className="add-edit-post">
        <form onSubmit={this.handleSubmit} className="create-edit-post">
          <input type="hidden" name="id" value={id}/>
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={title}
            onChange={(event) => this.updatePostData(event.target.name,event.target.value)}
          />
          <textarea
            name="body"
            placeholder="Body"
            value={body}
            onChange={(event) => this.updatePostData(event.target.name,event.target.value)}
          />
          {!postId &&
            <div>
            <input
              type="text"
              name="author"
              placeholder="Author"
              value={author}
              onChange={(event) => this.updatePostData(event.target.name,event.target.value)}
            />
            <input
              type="text"
              name="category"
              placeholder="Category"
              value={category}
              onChange={(event) => this.updatePostData(event.target.name,event.target.value)}
            />
            </div>
          }
          <button>{postId ? 'Edit Post' : 'Create Post'}</button>
        </form>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    posts: state.posts,
  }
}

function mapDispatchToProps (dispatch) {
  return {
    editPost: (post) => dispatch(editPost(post)),
    addPost: (post) => dispatch(addPost(post)),
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PostForm))
