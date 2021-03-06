import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { loadCategories } from "../actions";
import "../App.css";

/**
 * @description Display main nave (categories and home)
 * @constructor
 */
class Nav extends Component {
  /**
   * @description If there are no categories when the nav loads, load them.
   */
  componentDidMount() {
    if (this.props.categories.length === 0) {
      this.props.loadCategories();
    }
  }
  render() {
    const { categories } = this.props;
    return (
      <ul className="nav">
        <li className="home">
          <Link to="/">Home</Link>
        </li>
        {categories.map(category => (
          <li
            key={category.name}
            className={
              this.props.match.params.category === category.path ? "active" : ""
            }
          >
            <Link to={`/${category.path}`}>{category.name}</Link>
          </li>
        ))}
      </ul>
    );
  }
}

function mapStateToProps(state) {
  return {
    categories: state.categories
  };
}

function mapDispatchToProps(dispatch) {
  return {
    loadCategories: () => dispatch(loadCategories())
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Nav));
