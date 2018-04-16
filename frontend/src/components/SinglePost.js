import React, { Component } from "react";
import { Link, withRouter, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { deleteComment, voteComment, loadCommentCount } from "../actions";
import Modal from "react-modal";
import Moment from "react-moment";
import PostForm from "./PostForm";
import CommentForm from "./CommentForm";
import Markdown from "react-markdown";

/**
 * @description Display single post with associated comments
 * @constructor
 */
class SinglePost extends Component {
  state = {
    commentId: "",
    commentModalOpen: false,
    notFound: false
  };
  /**
   * @description Opens new/edit comment modal
   * @param {string} postId - ID of post to add comment to
   * @param {string} commentId - ID of comment to be edited, if present
   * @param {boolean} commentModalOpen - Sets local state to trigger rendering of modal
   */
  openCommentModal = (postId, commentId) => {
    this.setState(() => ({
      commentModalOpen: true,
      commentId
    }));
  };
  /**
   * @description Closes new/edit comment modal
   * @param {boolean} commentModalOpen - Sets local state to trigger closing of modal
   */
  closeCommentModal = () => {
    this.setState(() => ({
      commentModalOpen: false
    }));
  };
  /**
   * @description Gets comments for current post
   * @param {string} postId - Id of post to get comments for (passed from URL param)
   */
  componentDidMount() {
    this.props.getComments(this.props.match.params.postId);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.comments !== this.props.comments) {
      this.props.loadCommentCount(this.props.match.params.postId);
    }
    if (nextProps.posts.length !== 0) {
      if (
        nextProps.posts.find(
          post => post.id === nextProps.match.params.postId
        ) === undefined
      ) {
        this.setState({ notFound: true });
      }
    }
  }
  /**
   * @description increase or decrease voteCount on specified comment
   * @param {string} id - ID of comment to be voted on
   * @param {string} vote - upVote or downVote
   */
  voteComment = (id, vote) => {
    this.props.voteComment(id, { option: vote });
  };

  render() {
    const {
      comments,
      posts,
      openPostModal,
      closePostModal,
      postModalOpen,
      onDeletePost,
      vote
    } = this.props;
    const { postId } = this.props.match.params;
    const { commentModalOpen, commentId } = this.state;
    const post = posts.find(post => post.id === postId);
    if (this.state.notFound === false) {
      return (
        <div>
          {post && (
            <div className="single-post">
              <h1>
                {post.title}
                <span>
                  <Link
                    to="#"
                    onClick={() => openPostModal(post.id)}
                    className="edit-post"
                  >
                    &#9998;
                  </Link>
                  <Link
                    to="/"
                    onClick={() => onDeletePost(postId)}
                    className="delete-post"
                  >
                    X
                  </Link>
                </span>
              </h1>
              <Markdown source={post.body} />
              <div className="meta">
                <p className="author-time">
                  <span className="author">{post.author}</span>
                  <span className="date-time">
                    <Moment format="MMMM D, YYYY, h:mm a">
                      {post.timestamp}
                    </Moment>
                  </span>
                </p>
                <p className="vote-comments">
                  <span className="vote">
                    <Link to="#" onClick={() => vote(post.id, "upVote")}>
                      &#9650;
                    </Link>
                    <Link to="#" onClick={() => vote(post.id, "downVote")}>
                      &#9660;
                    </Link>
                    {post.voteScore}
                  </span>
                  <span className="comments">
                    Comments: {post.commentCount}
                  </span>
                </p>
              </div>
              <h2>Comments</h2>
              <Link
                to="#"
                onClick={() => this.openCommentModal(post.id)}
                className="add-comment"
              >
                New Comment
              </Link>
              <ul className="comments">
                {comments.map(comment => (
                  <li key={comment.id}>
                    <p className="author-edit">
                      <span className="author">{comment.author}</span>
                      <Link
                        to="#"
                        onClick={() =>
                          this.openCommentModal(post.id, comment.id)
                        }
                        className="edit-post"
                      >
                        &#9998;
                      </Link>
                      <Link
                        to="#"
                        onClick={() => this.props.deleteComment(comment.id)}
                        className="delete-post"
                      >
                        X
                      </Link>
                    </p>
                    <Markdown source={comment.body} />
                    <p className="vote-comments">
                      <span className="vote">
                        <Link
                          to="#"
                          onClick={() => this.voteComment(comment.id, "upVote")}
                        >
                          &#9650;
                        </Link>
                        <Link
                          to="#"
                          onClick={() =>
                            this.voteComment(comment.id, "downVote")
                          }
                        >
                          &#9660;
                        </Link>
                        {comment.voteScore}
                      </span>
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          )}
          <Modal
            className="modal"
            overlayClassName="overlay"
            isOpen={postModalOpen}
            contentLabel="Modal"
            onRequestClose={closePostModal}
          >
            <Link className="close-modal" to="#" onClick={closePostModal}>
              X
            </Link>
            <PostForm postId={postId} closePostModal={closePostModal} />
          </Modal>
          <Modal
            className="modal"
            overlayClassName="overlay"
            isOpen={commentModalOpen}
            contentLabel="Modal"
            onRequestClose={this.closeCommentModal}
          >
            <Link
              className="close-modal"
              to="#"
              onClick={this.closeCommentModal}
            >
              X
            </Link>
            <CommentForm
              postId={postId}
              commentId={commentId}
              closeCommentModal={this.closeCommentModal}
              comment={comments.filter(comment => comment.id === commentId)[0]}
            />
          </Modal>
        </div>
      );
    } else {
      return <Redirect to="/404" />;
    }
  }
}

function mapStateToProps(state, ownProps) {
  return {
    posts: state.posts,
    comments: state.comments,
    ...ownProps
  };
}

function mapDispatchToProps(dispatch) {
  return {
    voteComment: (id, vote) => dispatch(voteComment(id, vote)),
    loadCommentCount: id => dispatch(loadCommentCount(id))
  };
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(SinglePost)
);
