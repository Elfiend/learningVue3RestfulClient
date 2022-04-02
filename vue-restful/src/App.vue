<script setup>
import { RouterView } from 'vue-router'
</script>
<script>
import NavBar from '@/components/NavBar.vue';
export default {
    components: {
      NavBar,
  },
};
</script>


<template>
  <header>
    <div class="wrapper">
      <nav>
        <NavBar />
      </nav>
    </div>
  </header>

  <RouterView />
</template>
