<template>
  <main>
    <h1>This is Homepage.</h1>
    <UserList />
  </main>
</template>

<script>
import UserList from "@/components/UserList.vue";
export default {
  name: "Homepage",
  components: { UserList, },
}
</script>