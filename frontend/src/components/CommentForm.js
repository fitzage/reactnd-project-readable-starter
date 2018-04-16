import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import serializeForm from "form-serialize";
import { addComment, editComment } from "../actions";
const uuidv1 = require("uuid/v1");

/**
 * @description Form for adding new categories, editing existing ones
 * @constructor
 * @param {string} commentId - ID of comment to edit, if editing
 * @param {function} closeCommentModal - Function for closing form modal
 */
class PostForm extends Component {
  state = {
    id: uuidv1(),
    timestamp: new Date().getTime(),
    body: "",
    author: ""
  };

  /**
   * @description Handle values of new/edit post form on submit
   * @param {object} e - Event data from form submission with form values
   */
  handleSubmit = e => {
    e.preventDefault();
    let values = serializeForm(e.target, { hash: true });
    this.props.closeCommentModal();
    if (this.props.commentId) {
      values.timestamp = this.state.timestamp;
      this.props.editComment(values);
    } else {
      values.timestamp = this.state.timestamp;
      values.parentId = this.props.postId;
      this.props.addComment(values);
    }
  };
  /**
   * @description If commentId exists, populate state with existing comment data
   */
  componentDidMount() {
    if (this.props.commentId) {
      const comment = this.props.comment;
      this.setState({
        id: comment.id,
        body: comment.body,
        author: comment.author
      });
    }
  }
  /**
   * @description Update state with values from form on the fly
   * @param {string} name - Name of state parameter
   * @param {string} value - Value to go in state
   */
  updateCommentData(name, value) {
    let obj = {};
    obj[name] = value;
    this.setState(obj);
  }
  render() {
    const { commentId } = this.props;
    const { id, body, author } = this.state;
    return (
      <div className="add-edit-comment">
        <form onSubmit={this.handleSubmit} className="create-edit-post">
          <input type="hidden" name="id" value={id} />
          {!commentId && (
            <div className="author-category">
              <label className="author">
                Name
                <input
                  type="text"
                  name="author"
                  value={author}
                  onChange={event =>
                    this.updateCommentData(
                      event.target.name,
                      event.target.value
                    )
                  }
                />
              </label>
            </div>
          )}
          <label className="body">
            Body
            <textarea
              name="body"
              value={body}
              onChange={event =>
                this.updateCommentData(event.target.name, event.target.value)
              }
            />
          </label>
          {/* Only enable submit button when all fields have data. */}
          {body && author ? (
            <button>{commentId ? "Edit Comment" : "Create Comment"}</button>
          ) : (
            <button disabled>
              {commentId ? "Edit Comment" : "Create Comment"}
            </button>
          )}
        </form>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    editComment: comment => dispatch(editComment(comment)),
    addComment: comment => dispatch(addComment(comment))
  };
}

export default withRouter(connect(null, mapDispatchToProps)(PostForm));
