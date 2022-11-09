<template>
  <div
    class="the-navbar__user-meta flex items-center"
    v-if="activeUserInfo.displayName"
  >
    <!--    <div class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white" @click="logout">-->
    <div class="py-2 px-4">
      <p class="font-semibold" style="margin-bottom: 0">
        {{ user_info.data.name }}
      </p>
      <small>{{ user_info.data.company_name }}</small>
    </div>
    <vs-dropdown>
      <a class="a-icon" href.prevent>
        <vs-avatar
          :src="image + user_info.data.avatar"
          v-if="user_info.data.avatar"
        />
        <vs-avatar :src="image + 'user_60cc4a86c8539.png'" v-else />
      </a>
      <vs-dropdown-menu>
        <vs-dropdown-item>
          <vs-button color="primary" type="border" icon="logout" @click="logout"
            >Logout</vs-button
          >
        </vs-dropdown-item>
      </vs-dropdown-menu>
    </vs-dropdown>
  </div>
</template>

<script>
import firebase from "firebase/app";
import "firebase/auth";

export default {
  data() {
    return {
      image: `${process.env.VUE_APP_API_URL}/files/`,
      user_info: JSON.parse(localStorage.getItem("userInfo")),
    };
  },
  computed: {
    activeUserInfo() {
      return this.$store.state.AppActiveUser;
    },
  },
  methods: {
    logout() {
      // if user is logged in via auth0
      if (this.$auth.profile) this.$auth.logOut();

      // if user is logged in via firebase
      const firebaseCurrentUser = firebase.auth().currentUser;

      if (firebaseCurrentUser) {
        firebase
          .auth()
          .signOut()
          .then(() => {
            this.$router.push("/pages/login").catch(() => {});
          });
      }
      // If JWT login
      if (localStorage.getItem("accessToken")) {
        localStorage.removeItem("accessToken");
        this.$router.push("/pages/login").catch(() => {});
      }

      // Change role on logout. Same value as initialRole of acj.js
      // this.$acl.change('admin')
      localStorage.removeItem("userInfo");

      // This is just for demo Purpose. If user clicks on logout -> redirect
      this.$router.push("/pages/login").catch(() => {});
    },
  },
};
</script>
