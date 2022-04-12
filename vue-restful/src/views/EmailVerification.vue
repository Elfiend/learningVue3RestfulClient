<script setup>
</script>

<template>
  <main>
    <h1>Email Verification.</h1>
    <h3>{{ uid }}</h3>
    <h3>{{ token }}</h3>
    <div v-if="message" class="alert alert-danger" role="alert">
      {{ message }}
    </div>
  </main>
</template>

<script>
import { ErrorMessage } from "vee-validate";

export default {
  name: "EmailVerification",
  components: {
    ErrorMessage,
  },
  data() {
    return {
      uid: "",
      token: "",
      message: "",
    };
  },
  mounted() {
    this.uid = this.$route.params.uid
    this.token = this.$route.params.token
    this.data = {
      'uid': this.uid,
      'token': this.token
    }
    this.$store.dispatch("auth/email_verification", this.data).then(
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