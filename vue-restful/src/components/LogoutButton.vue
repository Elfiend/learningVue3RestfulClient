<template>
  <button class="nav-link" @click.prevent="logOut">
    <font-awesome-icon icon="sign-out-alt" /> LogOut
  </button>
</template>

<script>
import { useAuth0 } from "@/services/useAuth0.js";
const { logout } = useAuth0();
export default {
  name: 'LogoutButton',
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
    isSocial() {
      if (!this.currentUser) {
        return false;
      }
      return this.currentUser.is_social_auth;
    },
  },
  methods: {
    logOut() {
      if (this.isSocial) {
        this.$store.dispatch('auth/logout').then(
          logout()
        )
      } else {
        this.$store.dispatch('auth/logout').then(
          () => {
            this.$router.push('/');
          }
        );
      }
    },
  },
};
</script>
