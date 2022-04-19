import axios from 'axios';
import { reactive } from 'vue';
// import createAuth0Client from '@auth0/auth0-spa-js';

export const AuthState = reactive({
	user: null,
	loading: false,
	isAuthenticated: false,
});

const config = {
	domain: import.meta.env.VITE_AUTH0_DOMAIN,
	client_id: import.meta.env.VITE_AUTH0_CLIENT_ID,
};

export const useAuth0 = (state) => {
	const handleStateChange = async () => {
        // state.isAuthenticated = !!(await state.auth0.isAuthenticated());
        // state.user = await state.auth0.getUser();
        // state.loading = false;
	}
	const initAuth = () => {
        state.loading = true;
        // createAuth0Client({
        //     domain: config.domain,
        //     client_id: config.client_id,
        //     cacheLocation: 'localstorage',
        //     redirect_uri: `${window.location.origin}/social`,
        // }).then(async auth => {
        //     state.auth0 = auth;
        //     await handleStateChange();
        // });        
    }

    const login = async () => {
        // await state.auth0.loginWithPopup();
        // await handleStateChange();
		// await state.auth0.loginWithRedirect();
    };

    const logout = async () => {
        // state.auth0.logout({
        //     returnTo: window.location.origin,
        // });
    }

	// const login = async () => {
	// 	let url = `http://${config.domain}/authorize?`;
	// 	url += 'response_type=code';
	// 	url += `&client_id=${config.client_id}`;
	// 	url += `&redirect_uri=http://${config.callback}:3000/`;
	// 	console.log('URL : %o',url)
	// 	axios.get(url,{},{
	// 		'Access-Control-Allow-Origin':'http://localhost:3000',
	// 	}).then(
	// 		response=>{
	// 			console.log('Get url response : %o',response);
	// 		},
	// 		error=>{
	// 			console.log('Get url error : %o',error);
	// 		},
	// 	);
	// 	await handleStateChange();
	// };

	return {
        login,
        logout,
        initAuth,
	}
}

