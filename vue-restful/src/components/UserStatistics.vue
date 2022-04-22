<template>
  <div class="container">
    <h1>
      {{ sign_up_users }} of users who have signed up.
    </h1>
    <h1>
      {{ active_users }} of users with active sessions today.
    </h1>
    <h1>
      Average {{ average_user }} of active session users in the last 7 days rolling.
    </h1>
  </div>
</template>
<script>
export default {
  name: 'UserStatistics',
  data() {
    return {
      sign_up_users: 0,
      active_users: 0,
      average_user: 0,
    };
  },
  mounted() {
    this.$store.dispatch("auth/get_user_statistics").then(
      (data) => {
        console.log('UserStatistics mounted data:%o', data);
        this.sign_up_users = data.sign_up_users;
        this.active_users = data.active_users;
        this.average_user = data.average_user;
      },
      (error) => {
        console.log('UserStatistics mounted error:%o', error);
      }
    );
  },
};
</script>
