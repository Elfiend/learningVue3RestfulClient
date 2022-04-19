<template>
  <div>
    <router-link to="/login" class="nav-link">
      <font-awesome-icon icon="sign-in-alt" /> Login
    </router-link>
    <Auth0Button />
  </div>
</template>

<script>
import Auth0Button from "@/components//Auth0Button.vue";
export default {
  name: 'LoginButton',
  components: { Auth0Button, },
};
</script>