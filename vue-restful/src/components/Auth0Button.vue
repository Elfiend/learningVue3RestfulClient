<script setup>
import { useAuth0, AuthState } from "@/services/useAuth0.js";
const { login, logout, initAuth } = useAuth0(AuthState);

initAuth();
</script>
<template>
	<button @click="login()" class="btn btn-primary">Social Login</button>
</template>
