<template>
  <div>
    <LogoutButton v-show="loggedIn" />
    <LoginButton v-show="!loggedIn" />
    <SignupButton v-show="!loggedIn" />
  </div>
</template>

<script>
  import LoginButton from '@/components/LoginButton.vue';
  import LogoutButton from '@/components/LogoutButton.vue';
  import SignupButton from '@/components/SignupButton.vue';

  export default {
    name: 'AuthenticationButton',
    components: { LogoutButton, LoginButton, SignupButton },
    computed:{
      currentUser() {
        return this.$store.state.auth.user;
      },
      loggedIn() {
        return this.$store.state.auth.status.loggedIn;
      },
      isSocial(){
        if (!currentUser) {
          return false;
        }
        return currentUser.isSocial;
      },
      isEmailVerifided(){
        if (!currentUser) {
          return false;
        }
        return currentUser.isEmailVerifided;
      },
    }
  };
</script>
