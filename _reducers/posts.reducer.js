import React, { useState } from 'react';
import { postsConstants } from '../_constants';
import { favorites } from '../_helpers';

const initialState = {
  randomposts: [],
  randomposts_loading: true,
  randomposts_error: '',
  morerandomposts_loading: false,
  morerandomposts_error: '',
};


export function posts(state = initialState, action) {
  switch (action.type) {
    // READ RANDOM POSTS
    case postsConstants.READ_RANDOM_POSTS_REQUEST:
      return {
        ...state,
        randomposts_loading: true,
        randomposts_error: '',
      };

    case postsConstants.READ_RANDOM_POSTS_SUCCESS:
      return {
        ...state,
        randomposts: action.posts,
        randomposts_loading: false,
        randomposts_error: '',
      };

    case postsConstants.READ_RANDOM_POSTS_FAILURE:
      return {
        ...state,
        randomposts_error: action.error.message,
        randomposts_loading: false,
      };

    // READ MORE RANDOM POSTS
    case postsConstants.READ_MORE_RANDOM_POSTS_REQUEST:
      return {
        ...state,
        morerandomposts_loading: true,
        morerandomposts_error: '',
      };

    case postsConstants.READ_MORE_RANDOM_POSTS_SUCCESS:
      return {
        ...state,
        randomposts: [...state.randomposts, ...action.posts],
        morerandomposts_loading: false,
        morerandomposts_error: '',
      };

    case postsConstants.READ_MORE_RANDOM_POSTS_FAILURE:
      return {
        ...state,
        morerandomposts_loading: action.error.message,
        morerandomposts_error: false,
      };

    default:
      return state;
  }
}
