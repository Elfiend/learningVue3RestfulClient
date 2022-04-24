class httpHeader{
	authHeader() {
		let user = JSON.parse(localStorage.getItem('user'));
		if (user && user.token) {
		  return { Authorization: 'Token ' + user.token };
		} else {
		  return {};
		}
	}
}
export default new httpHeader()