import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import serializeForm from 'form-serialize'
import { addComment, editComment } from '../actions'

const uuidv1 = require('uuid/v1')
class PostForm extends Component {
  state = {
    id: uuidv1(),
    timestamp: (new Date()).getTime(),
    body: '',
    author: '',
  }
  handleSubmit = (e) => {
    e.preventDefault()
    let values = serializeForm(e.target,{hash: true})
    this.props.closeCommentModal()
    if (this.props.commentId) {
      values.timestamp = this.state.timestamp
      this.props.editComment(values)
    } else {
      values.timestamp = this.state.timestamp
      values.parentId = this.props.postId
      this.props.addComment(values)
    }
  }
  componentDidMount() {
    if (this.props.commentId) {
      const comment = this.props.comment
      console.log(comment)
      this.setState({
        id: comment.id,
        body: comment.body,
        author: comment.author,
      })
    }
  }
  updateCommentData(name, value) {
    console.log(value)
    let obj = {};
    obj[name] = value
    this.setState(obj)
  }
  render() {
    const { commentId } = this.props
    const { id, body, author } = this.state
    return (
      <div className="add-edit-comment">
        <form onSubmit={this.handleSubmit} className="create-edit-post">
          <input type="hidden" name="id" value={id}/>
          <textarea
            name="body"
            placeholder="Body"
            value={body}
            onChange={(event) => this.updateCommentData(event.target.name,event.target.value)}
          />
          {!commentId &&
            <input
              type="text"
              name="author"
              placeholder="Author"
              value={author}
              onChange={(event) => this.updateCommentData(event.target.name,event.target.value)}
            />
          }
          <button>{commentId ? 'Edit Comment' : 'Create Comment'}</button>
        </form>
      </div>
    )
  }
}

function mapDispatchToProps (dispatch) {
  return {
    editComment: (comment) => dispatch(editComment(comment)),
    addComment: (comment) => dispatch(addComment(comment)),
  }
}

export default withRouter(connect(null,mapDispatchToProps)(PostForm))
