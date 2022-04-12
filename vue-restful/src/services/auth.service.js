import axios from 'axios';
import httpHeader from './auth-header';
axios.defaults.xsrfHeaderName = 'x-csrftoken'
axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.withCredentials = true
axios.defaults.baseURL = 'http://localhost:8000/'

class AuthService {
	register(user) {
		return axios.post('api/auth/signup', {
		  email: user.username,
		  password: user.password,
		  password2: user.password2,
		});
	}
	login(user) {
		return axios
		  .post('api/auth/login', {
			email: user.username,
			password: user.password,
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
		return axios.post('api/auth/logout', {});
	}
	resend_verification_email(){
		return axios
		.post('api/auth/resend_verification_email', {
		},{
			headers:httpHeader.authHeader(),
		})
	}
	email_verfification(data){
		return axios.get('api/auth/email_verification/'+data.uid+'/'+data.token+'/', {});
	}
	reset_password(user){
		return axios
		.post('api/auth/reset_password', {
		  old_password: user.old_password,
		  new_password: user.new_password,
		  reenter_new_password: user.reenter_new_password,
		},{
			headers:httpHeader.authHeader(),
		})
	}
	update_profile(user){
		return axios
		.post('api/auth/update_profile', {
			social_name: user.social_name,
		},{
			headers:httpHeader.authHeader(),
		})
	}
}
export default new AuthService();
