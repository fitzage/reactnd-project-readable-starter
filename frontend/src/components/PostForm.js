import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import serializeForm from 'form-serialize'
import { addPost, editPost } from '../actions'

const uuidv1 = require('uuid/v1')
class PostForm extends Component {
  state = {
    id: uuidv1(),
    timestamp: (new Date()).getTime(),
    title: '',
    body: '',
    author: '',
    category: '',
  }
  handleSubmit = (e) => {
    e.preventDefault()
    let values = serializeForm(e.target,{hash: true})
    this.props.history.push(`/${values.category}/${values.id}`)
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
  render() {
    const { postId, categories, categoryId } = this.props
    const { id, title, body, author, category } = this.state
    return (
      <div className="add-edit-post">
        <h1>{!postId ? 'New Post' : 'Edit Post'}</h1>
        <form onSubmit={this.handleSubmit} className="create-edit-post">
          <input type="hidden" name="id" value={id}/>
          <label className="title">Title
          <input
            type="text"
            name="title"
            value={title}
            onChange={(event) => this.updatePostData(event.target.name,event.target.value)}
          />
          </label>
          {!postId &&
            <div className="author-category">
            <label className="author">Name
            <input
              type="text"
              name="author"
              value={author}
              onChange={(event) => this.updatePostData(event.target.name,event.target.value)}
            />
            </label>
            <label className="category">Category
            <select
              onChange={(event) => this.updatePostData(event.target.name,event.target.value)}
              name="category"
              defaultValue={categoryId ? categoryId : 'category'}
            >
              <option value="category" disabled>Category</option>
              {categories.map((category) => (
                <option value={category.name} key={category.name}>{category.name}</option>
              ))}
            </select>
            </label>
            </div>
          }
          <label className="body">Body
          <textarea
            name="body"
            value={body}
            onChange={(event) => this.updatePostData(event.target.name,event.target.value)}
          />
          </label>
          {(title && body && category && author)
            ? <button >{postId ? 'Edit Post' : 'Create Post'}</button>
            : <button disabled>{postId ? 'Edit Post' : 'Create Post'}</button>
          }
        </form>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    posts: state.posts,
    categories: state.categories,
  }
}

function mapDispatchToProps (dispatch) {
  return {
    editPost: (post) => dispatch(editPost(post)),
    addPost: (post) => dispatch(addPost(post)),
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PostForm))
