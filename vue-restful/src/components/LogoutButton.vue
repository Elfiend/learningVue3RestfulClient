<template>
  <button class="nav-link" @click.prevent="logOut">
    <font-awesome-icon icon="sign-out-alt" /> LogOut
  </button>
</template>

<script>
  export default {
    name: 'LogoutButton',
    methods: {
      logOut() {
        this.$store.dispatch('auth/logout').then(
          ()=>{this.$router.push('/');}
        );
      },
    },
  };
</script>
