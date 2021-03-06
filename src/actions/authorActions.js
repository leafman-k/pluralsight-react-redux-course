import * as types from './actionTypes';
import AuthorApi from '../api/mockAuthorApi';
import {beginAjaxCall, ajaxCallError} from './ajaxStatusActions';
export function loadAuthorsSuccess(authors){
  return { type: types.LOAD_AUTHORS_SUCCESS, authors};
}
export function updateAuthorSuccess(author){
  return {type: types.UPDATE_AUTHOR_SUCCESS, author};
}
export function createAuthorSuccess(author){
  return {type: types.CREATE_AUTHOR_SUCCESS, author};
}
export function loadAuthors(){
  return function(dispatch){
    return AuthorApi.getAllAuthors().then(authors =>{
      dispatch(beginAjaxCall());
      dispatch(loadAuthorsSuccess(authors));
    }).catch(error => {
      throw(error);
    });
  };
}
export function saveAuthor(author){
  return function (dispatch, getState){
    dispatch(beginAjaxCall());
    return AuthorApi.saveAuthor(author).then(savedAuthor => {
      author.id ? dispatch(updateAuthorSuccess(savedAuthor)) :
        dispatch(createAuthorSuccess(savedAuthor));

    }).catch(error => {
      dispatch(ajaxCallError(error));
      throw(error);
    });
  };
}
