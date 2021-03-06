import axios from 'axios';
import httpHeader from './auth-header';
axios.defaults.xsrfHeaderName = 'x-csrftoken'
axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.withCredentials = true
axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL

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
				if (response.data.token) {
					localStorage.setItem('user', JSON.stringify(response.data));
				}
				return response.data;
			});
	}
	social_login(user) {
		return axios.post('api/login/social/token/', {
			provider: user.provider,
			code: user.code,
		})
			.then(response => {
				console.log('social_login r :%o', response.data)
				if (response.data.token) {
					localStorage.setItem('user', JSON.stringify(response.data));
				}
				// return response.data;
				return this.get_user_data();
			});
	}
	get_user_data() {
		return axios.post('api/users/get_detail', {
		}, {
			headers: httpHeader.authHeader(),
		}).then(response => {
			console.log('get_user_data r :%o', response.data)
			if (response.data.token) {
				localStorage.setItem('user', JSON.stringify(response.data));
			}
			return response.data;
		});
	}
	logout() {
		return axios.post('api/auth/logout',{
		},{
			headers:httpHeader.authHeader(),
		}).then(
			localStorage.removeItem('user')
		);
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
