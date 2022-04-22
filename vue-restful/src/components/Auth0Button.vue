<script setup>
import { useAuth0 } from "@/services/useAuth0.js";
const { login  } = useAuth0();
</script>
<template>
	<button @click="login()" class="btn btn-primary">Social Login</button>
</template>
