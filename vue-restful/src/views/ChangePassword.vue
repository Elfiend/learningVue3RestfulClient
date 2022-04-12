<template>
  <div class="col-md-12">
    <div class="card card-container">
      <Form @submit="handleChangePassword">
        <div class="form-group">
          <Field name="username" type="hidden" class="form-control" :model-value="currentUser.social_name" />
        </div>
        <div class="form-group">
          <label for="old_password">Current Password</label>
          <Field name="old_password" type="password" class="form-control" />
          <ErrorMessage name="password" class="error-feedback" />
        </div>
        <div class="form-group">
          <label for="new_password">New Password</label>
          <Field name="new_password" type="password" class="form-control" />
          <ErrorMessage name="password" class="error-feedback" />
        </div>
        <div class="form-group">
          <label for="reenter_new_password">Password Confirmed</label>
          <Field name="reenter_new_password" type="password" class="form-control" />
          <ErrorMessage name="password" class="error-feedback" />
        </div>
        <div class="form-group">
          <button class="btn btn-primary btn-block" :disabled="loading">
            <span v-show="loading" class="spinner-border spinner-border-sm"></span>
            <span>Change Password</span>
          </button>
        </div>
        <div class="form-group">
          <div v-if="message" class="alert alert-danger" role="alert">
            {{ message }}
          </div>
        </div>
      </Form>
    </div>
  </div>
</template>
<script>
import { Form, Field, ErrorMessage } from "vee-validate";
export default {
  name: "ChangePassword",
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  data() {
    return {
      loading: false,
      message: "",
    };
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
  },
  mounted() {
    if (!this.currentUser) {
      this.$router.push('/profile');
    }
  },
  methods: {
    handleChangePassword(user) {
      this.loading = true;
      this.$store.dispatch("auth/changepassword", user).then(
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
    },
  },
};
</script>
