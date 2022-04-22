<template>
  <main>
    <UserStatistics />
    <UserList />
  </main>
</template>

<script>
import UserList from "@/components/UserList.vue";
import UserStatistics from "@/components/UserStatistics.vue";
export default {
  name: "Homepage",
  components: { UserList, UserStatistics, },
}
</script>