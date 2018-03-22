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
    type: types.LOAD_CATEGORIES_SUCCESS,
    categories
  }
}