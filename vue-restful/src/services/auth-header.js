class httpHeader{
	authHeader() {
		let user = JSON.parse(localStorage.getItem('user'));
		if (user && user.accessToken) {
		  return { Authorization: 'Bearer ' + user.accessToken };
		} else {
		  return {};
		}
	}
	defaultHeader(){
		return {'Access-Control-Allow-Origin':'http://localhost:3000'};
	}
}
export default new httpHeader()