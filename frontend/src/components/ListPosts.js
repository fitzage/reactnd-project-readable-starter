import React, { Component } from "react";
import { Link, withRouter, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { votePost, deletePost, deleteComment, getComments } from "../actions";
import Moment from "react-moment";
import Truncate from "react-truncate";
import Modal from "react-modal";
import PostForm from "./PostForm";

/* TODO: add confirmation when deleting posts/comments ?? */
/**
 * @description Lists posts with metadata
 * @constructor
 */
class ListPosts extends Component {
  state = {
    postModalOpen: false,
    postId: null,
    sortKey: "timestamp",
    sortOrder: "asc",
    notFound: false
  };
  /**
   * @description Opens new/edit post modal
   * @param {string} postId - ID of post to be edited, if present
   * @param {boolean} postModalOpen - Sets local state to trigger rendering of modal
   */
  openPostModal = postId => {
    this.setState(() => ({
      postModalOpen: true,
      postId
    }));
  };
  /**
   * @description Closes new/edit post modal
   * @param {boolean} postModalOpen - Sets local state to trigger closing of modal
   */
  closePostModal = () => {
    this.setState(() => ({
      postModalOpen: false
    }));
  };
  /**
   * @description increase voteCount on post
   * @param {string} id - ID of post to be voted on
   */
  upVote = id => {
    this.props.votePost(id, { option: "upVote" });
  };
  /**
   * @description decrease voteCount on post
   * @param {string} id - ID of post to be voted on
   */
  downVote = id => {
    this.props.votePost(id, { option: "downVote" });
  };
  /**
   * @description delete a post and associated comments
   * @param {string} id - ID of post to be deleted
   */
  deletePost = id => {
    this.props.getComments(id).then(comments => {
      this.props.comments.map(comment => this.props.deleteComment(comment.id));
    });
    this.props.deletePost(id);
  };
  /**
   * @description Called to change the key to sort by. Sets this value in local state.
   * @param {string} value - Name of field to sort by
   */
  onChangeSortKey = value => {
    this.setState({ sortKey: value });
  };
  /**
   * @description Called to change the sort order. Sets this value in local state.
   * @param {string} value - asc or desc to set sort order
   */
  onChangeSortOrder = value => {
    this.setState({ sortOrder: value });
  };
  /**
   * @description Checks to see if there is a filter category, and if it exists.
   *   Otherwise, it sets the not found value in local state, triggering 404.
   * @param {object} nextProps - Receives next props when props are changing.
   */
  componentWillReceiveProps(nextProps) {
    if (nextProps.categories.length !== 0) {
      if (
        nextProps.match.params.category &&
        nextProps.categories.filter(
          obj => obj.path === nextProps.match.params.category
        ).length === 0
      ) {
        this.setState({ notFound: true });
      }
    }
  }
  render() {
    const { category } = this.props.match.params;
    const { posts } = this.props;
    const { postModalOpen, postId, sortKey, sortOrder } = this.state;
    /**
     * @description Generates permalink for post
     * @param {string} postCategory - category for post that needs permalink constructed
     * @param {string} postId - ID for post that needs permalink constructed
     */
    const postLink = (postCategory, postId) => `/${postCategory}/${postId}`;
    let filteredPosts;
    /**
     * @description If a category parameter exists, filter the list of posts by that category.
     * @param {array} posts - Array of posts from store
     * @param {string} category - Category parameter
     */
    category
      ? (filteredPosts = posts.filter(post => post.category === category))
      : (filteredPosts = posts);
    /* Only render if category exists based on "notFound" value in local state. */
    if (this.state.notFound === false) {
      return (
        /* Display category name in page header if it exists, otherwise display "All Posts" */
        <div>
          <h1>{category ? `Category: ${category}` : "All Posts"}</h1>
          {/* Sort controls */}
          <select
            defaultValue={sortKey}
            onChange={e => this.onChangeSortKey(e.target.value)}
          >
            <option value="timestamp">Date/Time</option>
            <option value="voteScore">Vote Score</option>
            <option value="author">Author Name</option>
            <option value="title">Title</option>
          </select>
          <select
            defaultValue={sortOrder}
            onChange={e => this.onChangeSortOrder(e.target.value)}
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
          {/* Open new post modal with form by triggering appropriate function */}
          <Link
            to="#"
            onClick={() => this.openPostModal()}
            className="add-post"
          >
            New Post
          </Link>
          <ul className="posts">
            {/* Sort posts according to sortKey and sortOrder values in local state */}
            {filteredPosts
              .sort((a, b) => {
                if (sortOrder === "asc") {
                  if (a[sortKey] < b[sortKey]) {
                    return -1;
                  } else if (a[sortKey] > b[sortKey]) {
                    return 1;
                  } else {
                    return 0;
                  }
                } else {
                  if (a[sortKey] < b[sortKey]) {
                    return 1;
                  } else if (a[sortKey] > b[sortKey]) {
                    return -1;
                  } else {
                    return 0;
                  }
                }
              })
              .map(post => (
                {/* Map sorted posts for display */}
                <li className="post" key={post.id}>
                  <h2>
                    <Link to={postLink(post.category, post.id)}>
                      {post.title}
                    </Link>
                    <span>
                      <Link
                        to="#"
                        onClick={() => this.openPostModal(post.id)}
                        className="edit-post"
                      >
                        &#9998;
                      </Link>
                      <Link
                        to="#"
                        onClick={() => this.deletePost(post.id)}
                        className="delete-post"
                      >
                        X
                      </Link>
                    </span>
                  </h2>
                  <Truncate
                    lines={3}
                    ellipsis={<span className="ellipsis">...</span>}
                  >
                    {post.body}
                  </Truncate>
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
                        <Link
                          to="#"
                          onClick={() => this.upVote(post.id)}
                          className="upvote"
                        >
                          &#9650;
                        </Link>
                        <Link
                          to="#"
                          onClick={() => this.downVote(post.id)}
                          className="downvote"
                        >
                          &#9660;
                        </Link>
                        {post.voteScore}
                      </span>
                      <span className="comments">
                        Comments: {post.commentCount}
                      </span>
                    </p>
                  </div>
                </li>
              ))}
          </ul>
          <Modal
            className="modal"
            overlayClassName="overlay"
            isOpen={postModalOpen}
            contentLabel="Modal"
          >
            <Link className="close-modal" to="#" onClick={this.closePostModal}>
              X
            </Link>
            <PostForm
              postId={postId}
              closePostModal={this.closePostModal}
              categoryId={category}
            />
          </Modal>
        </div>
      );
    } else {
      /* If category isn't found, redirect to error page. */
      return <Redirect to="/404" />;
    }
  }
}

function mapStateToProps(state) {
  return {
    posts: state.posts,
    categories: state.categories,
    comments: state.comments
  };
}

function mapDispatchToProps(dispatch) {
  return {
    votePost: (id, vote) => dispatch(votePost(id, vote)),
    deletePost: id => dispatch(deletePost(id)),
    getComments: id => dispatch(getComments(id)),
    deleteComment: id => dispatch(deleteComment(id))
  };
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ListPosts)
);
