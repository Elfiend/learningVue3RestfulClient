import AuthService from '../services/auth.service';
import UserService from '../services/user.service';
const user = JSON.parse(localStorage.getItem('user'));
const initialState = user
  ? { status: { loggedIn: true }, user }
  : { status: { loggedIn: false }, user: null };
export const auth = {
  namespaced: true,
  state: initialState,
  actions: {
    login({ commit }, user) {
      return AuthService.login(user).then(
        user => {
          commit('loginSuccess', user);
          return Promise.resolve(user);
        },
        error => {
          commit('loginFailure');
          return Promise.reject(error);
        }
      );
    },
    social_login({ commit }, user){
      return AuthService.social_login(user).then(
        user => {
          commit('loginSuccess', user);
          return Promise.resolve(user);
        },
        error => {
          commit('loginFailure');
          return Promise.reject(error);
        }
      );
    },
    logout({ commit }) {
      AuthService.logout();
      commit('logout');
    },
    register({ commit }, user) {
      return AuthService.register(user).then(
        response => {
          commit('registerSuccess');
          commit('loginSuccess', response.data);
          if (response.data.token) {
            localStorage.setItem('user', JSON.stringify(response.data));
          }    
          return Promise.resolve(response.data);
        },
        error => {
          commit('registerFailure');
          return Promise.reject(error);
        },
      );
    },
    resendEmail({ commit }) {
      AuthService.resend_verification_email();
    },
    changepassword({ commit }, user) {
      return AuthService.reset_password(user).then(
        response => {
          return Promise.resolve(response.data);
        },
        error => {
          return Promise.reject(error);
        }
      );
    },
    changename({ commit }, user) {
      console.log(user);
      return AuthService.update_profile(user).then(
        response => {
          commit('changeName');
          return Promise.resolve(response.data);
        },
        error => {
          return Promise.reject(error);
        }
      );
    },
    email_verification({commit}, data){
      console.log('store : %o, ', data)
      return AuthService.email_verfification(data).then(
        response => {
          commit('loginSuccess', response.data);
          if (response.data.token) {
            localStorage.setItem('user', JSON.stringify(response.data));
          }    
          return Promise.resolve(response.data);      
        },
        error => {
          commit('loginFailure');
          return Promise.reject(error);
        },
     );
    },
    get_user_list({commit}, data){
      return UserService.getUserList(data).then(
        response =>{
          return Promise.resolve(response.data);
        },
        error =>{
          console.log('store get_user_list error:%o',error);
          return Promise.reject(error);
        }
      );
    },
    get_user_statistics({commit}){
      return UserService.getUserStatistics().then(
        response =>{
          return Promise.resolve(response.data);
        },
        error =>{
          console.log('store get_user_statistics error:%o',error);
          return Promise.reject(error);
        }     
      );
    },
  },
  mutations: {
    loginSuccess(state, user) {
      state.status.loggedIn = true;
      state.user = user;
    },
    loginFailure(state) {
      state.status.loggedIn = false;
      state.user = null;
    },
    logout(state) {
      state.status.loggedIn = false;
      state.user = null;
    },
    registerSuccess(state) {
      state.status.loggedIn = true;
    },
    registerFailure(state) {
      state.status.loggedIn = false;
    },
    changeName(state, user){
      state.user = user;
    },
  }
};
