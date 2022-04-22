<template>
  <div class="container">
    <header>
      <button class="btn btn-primary" type="button" @click.prevent="previousPages" v-show="this.previous">
        Previous Page
      </button>
      <button class="btn btn-primary" type="button" @click.prevent="nextPages" v-show="this.next">
        Next Page
      </button>
    </header>
    <table>
      <thead>
        <tr>
          <th>User Eamil</th>
          <th>Timestamp of user sign up</th>
          <th>Number of times logged in</th>
          <th>Timestamp of the last user session</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in user_list" :key="user_list.email">
          <td>{{ user.email }}</td>
          <td>{{ user.date_joined }}</td>
          <td>{{ user.login_count }}</td>
          <td>{{ user.last_login }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
export default {
  name: 'UserList',
  data() {
    return {
      currentPage: 1,
      next: false,
      previous: false,
      user_list: [{
        "email": "",
        "date_joined": "",
        "login_count": 0,
        "last_login": null,
      }],
    };
  },
  mounted() {
    this.handleGetUserList(this.currentPage);
  },
  methods: {
    previousPages() {
      this.currentPage -= 1;
      this.handleGetUserList(this.currentPage);
    },
    nextPages() {
      this.currentPage += 1;
      this.handleGetUserList(this.currentPage);
    },
    handleGetUserList(currentPage) {
      let data = {
        'page': currentPage,
      }
      this.$store.dispatch("auth/get_user_list", data).then(
        (data) => {
          this.user_list = data.results;
          this.next = data.next==null?false:true;
          this.previous = data.previous==null?false:true;
        },
        (error) => {
          console.log('UserList handleGetUserList error:%o', error);
        }
      );
    }
  }
};
</script>
