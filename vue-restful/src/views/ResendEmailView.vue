<template>
	<button class="btn btn-primary btn-block" :disabled="loading" @click.prevent="resendEmail">
		<span v-show="loading" class="spinner-border spinner-border-sm"></span>
		<span>Resend Email Verification</span>
	</button>
	<div v-if="message" class="alert alert-danger" role="alert">
		{{ message }}
	</div>
</template>

<script>
import { ErrorMessage } from "vee-validate";

export default {
	name: 'ResendEmail',
	components: {
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
		isEmailVerifided() {
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
	},
	methods: {
		resendEmail() {
			this.loading = true;
			this.$store.dispatch('auth/resendEmail').then(
				() => {
					this.loading = false;
					this.message = 'Successful send email. Please confirm your mail box.';
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