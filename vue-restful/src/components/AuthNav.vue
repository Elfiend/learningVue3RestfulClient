<template>
  <div>
    <HomeButton />
    <ProfileButton v-show="loggedIn" />
    <ChangePasswordButton v-show="canChangePassword" />
    <LogoutButton v-show="loggedIn" />
    <LoginButton v-show="!loggedIn" />
    <SignupButton v-show="!loggedIn" />
  </div>
</template>

<script>
  import HomeButton from '@/components/HomeButton.vue';
  import LoginButton from '@/components/LoginButton.vue';
  import LogoutButton from '@/components/LogoutButton.vue';
  import SignupButton from '@/components/SignupButton.vue';
  import ChangePasswordButton from './ChangePasswordButton.vue';
  import ProfileButton from '@/components/ProfileButton.vue';

  export default {
    name: 'AuthenticationButton',
    components: { LogoutButton, LoginButton, SignupButton, ChangePasswordButton,HomeButton, ProfileButton,},
    computed:{
      loggedIn() {
        return this.$store.state.auth.status.loggedIn;
      },
      canChangePassword(){
        if (!this.loggedIn) return false;
        this.currentUser = this.$store.state.auth.user;
        if (!this.currentUser) return false;
        if (this.currentUser.is_social_auth) return false;
        if (!this.currentUser.email_confirmed) return false;
        return true;
      }
    }
  };
</script>
