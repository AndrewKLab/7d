import axios from 'axios';
import { AsyncStorage } from 'react-native';

export const postsService = {
  readRandomPosts,
};

function readRandomPosts(offset) {
  return axios.get(`https://proekt7d.ru//api/v1/post/read_random_posts.php?o=${offset}`);
}

