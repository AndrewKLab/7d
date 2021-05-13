import { postsConstants } from '../_constants';
import { postsService } from '../_services';
import moment from 'moment';

export const postsActions = {
  readNewPosts,
  readMoreNewPosts,
};

function readNewPosts(offset) {
  return (dispatch) => {
    dispatch(request(offset));
    return postsService
      .readRandomPosts(offset)
      .then((posts) => {
        dispatch(success(posts.data));
      })
      .catch((error) => {
        dispatch(failure(error));
      });
  };

  function request(offset) {
    return { type: postsConstants.READ_RANDOM_POSTS_REQUEST, offset };
  }
  function success(posts) {
    return { type: postsConstants.READ_RANDOM_POSTS_SUCCESS, posts };
  }
  function failure(error) {
    return { type: postsConstants.READ_RANDOM_POSTS_FAILURE, error };
  }
}

function readMoreNewPosts(offset) {
  return (dispatch) => {
    dispatch(request(offset));
    return postsService
      .readRandomPosts(offset)
      .then((posts) => {
        dispatch(success(posts.data));
      })
      .catch((error) => {
        dispatch(failure(error));
      });
  };

  function request(offset) {
    return { type: postsConstants.READ_MORE_RANDOM_POSTS_REQUEST, offset };
  }
  function success(posts) {
    return { type: postsConstants.READ_MORE_RANDOM_POSTS_SUCCESS, posts };
  }
  function failure(error) {
    return { type: postsConstants.READ_MORE_RANDOM_POSTS_FAILURE, error };
  }
}
