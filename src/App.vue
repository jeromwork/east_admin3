<template>
  <v-app>

    <v-app-bar
            app
            color="primary"
            dark
    >
      <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>

      <v-toolbar-title>Title</v-toolbar-title>

      <v-spacer></v-spacer>
      <ec-login-bar/>
    </v-app-bar>

    <v-navigation-drawer
            v-model="drawer"
            absolute
            temporary
    >


      <ec-menu/>
    </v-navigation-drawer>

    <v-main>

      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
  import EcLoginBar from './components/Login/LoginBar.vue'
  import EcMenu from "./components/Menu/Menu.vue";
  export default {
    name: 'App',

    components: {
      EcMenu,
      //DoctorSettings,
      //Login,
      EcLoginBar,

    },
    created(){
      //делаем запрос прислать данные юзера - логин, имя список контактов и тд
      //если присылаются данные, ставим пометку, что юзер авторизован
      //console.log('created');
      this.$store.dispatch('Login/getUserData');
      this.$store.dispatch('Access/getAccessLists');
      this.$store.dispatch('Access/getAccessRules');
      this.$store.dispatch('Access/initWebSocket');
    },
    data: () => ({
      drawer: false,
      group: null,
    }),
  };
</script>
