import { combineReducers } from 'redux';

import { style } from './styles.reducer';
import { posts } from './posts.reducer';

const rootReducer = combineReducers({
  style,
  posts
});

export default rootReducer;