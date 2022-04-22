import axios from 'axios';

axios.defaults.xsrfHeaderName = 'x-csrftoken'
axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.withCredentials = true
axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL

class UserService {
  getUserList(data) {
    return axios.get('api/users', { 'params': data });
  }
  getUserStatistics() {
    return axios.get('api/users/get_statistics');
  }
}
export default new UserService();
