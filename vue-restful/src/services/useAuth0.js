const config = {
	domain: import.meta.env.VITE_AUTH0_DOMAIN,
	client_id: import.meta.env.VITE_AUTH0_CLIENT_ID,
};

export const useAuth0 = (state) => {
	const login = async () => {
		let url = `https://${config.domain}/authorize?`;
		url += 'response_type=code';
		url += `&client_id=${config.client_id}`;
		url += `&redirect_uri=${window.location.origin}/social`;
		url += '&scope=openid%20profile%20email'
		console.log('URL : %o', url)
		window.location.href = url;
	};
	const logout = async()=>{
		let url = `https://${config.domain}/v2/logout?`;
		url += `&client_id=${config.client_id}`;
		url += `&returnTo=${window.location.origin}`;
		window.location.href = url;
	};

	return {
		login,
		logout,
	}
}

