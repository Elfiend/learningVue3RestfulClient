<template>
  <a class="nav-link" @click.prevent="logOut">
    <font-awesome-icon icon="sign-out-alt" /> LogOut
  </a>
</template>

<script>
  export default {
    name: 'LogoutButton',
    methods: {
      logOut() {
        this.$store.dispatch('auth/logout');
        this.$router.push('/');
      },
    },
  };
</script>
