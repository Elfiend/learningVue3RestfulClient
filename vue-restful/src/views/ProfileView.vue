<template>
  <div class="container">
    <header class="jumbotron">
      <h3>
        <strong>{{social_name}}</strong> Profile
      </h3>
    </header>
      <Form @submit="handleChangeName">
        <div class="form-group">
          <label for="social_name">Social Name</label>
          <Field v-model="social_name" name="social_name" type="text" class="form-control" />
          <ErrorMessage name="username" class="error-feedback" />
        </div>
        <div class="form-group">
          <button class="btn btn-primary btn-block" :disabled="loading">
            <span
              v-show="loading"
              class="spinner-border spinner-border-sm"
            ></span>
            <span>ChangeName</span>
          </button>
        </div>
        <div class="form-group">
          <div v-if="message" class="alert alert-danger" role="alert">
            {{ message }}
          </div>
        </div>

      </Form>
  </div>
</template>
<script>
import { Form, Field, ErrorMessage } from "vee-validate";

export default {
  name: 'Profile',
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  data(){
    return {
      social_name:"",
      loading: false,
      message: "",
    };
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
    isEmailVerifided(){
      if (!this.currentUser) {
        return false;
      }
      return this.currentUser.email_confirmed;
    },
  },
  mounted() {
    if (!this.currentUser) {
      this.$router.push('/login');
    }
    if (!this.isEmailVerifided) {
      this.$router.push('/resendemail');
    }
    this.social_name = this.currentUser.social_name;
  },
  methods:{
    handleChangeName(user){
      this.loading = true;
      this.$store.dispatch("auth/changename", user).then(
        () => {
          this.loading = false;
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
  }
};
</script>
