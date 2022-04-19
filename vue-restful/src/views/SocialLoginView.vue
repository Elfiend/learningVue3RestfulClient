<template>
  <div class="col-md-12">
    Social Login
    {{ $route.query.code }}
  </div>
</template>
<script>
export default {
  name: "SocialLogin",
  data() {
    return {
      code: "",
    };
  },
  mounted() {
    this.data = {
      'provider': 'auth0',
      'code': this.$route.query.code,
    }
    this.$store.dispatch("auth/social_login", this.data).then(
      (data) => {
        this.$router.push("/profile");
      },
      (error) => {
        this.loading = false;
        this.message =
          (error.response &&
            error.response.data) ||
          error.message ||
          error.toString();
      }
    );
  }
};
</script>
