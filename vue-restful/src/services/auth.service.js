import axios from 'axios';
import httpHeader from './auth-header';

const API_URL = 'http://localhost:8000/api/auth/';
class AuthService {
	register(user) {
		return axios.post(API_URL + 'register', {
		  email: user.username,
		  password: user.password,
		  headers: httpHeader.defaultHeader()
		})
		.then(response => {
		  if (response.data.auth_token) {
			localStorage.setItem('user', JSON.stringify(response.data));
		  }
		  return response.data;
		});
	}
	login(user) {
		return axios
		  .post(API_URL + 'login', {
			email: user.username,
			password: user.password,
			headers: httpHeader.defaultHeader()
		  })
		  .then(response => {
			if (response.data.auth_token) {
			  localStorage.setItem('user', JSON.stringify(response.data));
			}
			return response.data;
		  });
	}
	logout() {
		localStorage.removeItem('user');
		return axios.post(API_URL + 'logout', {headers: httpHeader.defaultHeader()});
	}
}
export default new AuthService();
