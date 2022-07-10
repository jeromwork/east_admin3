<template>
  <v-list
    nav
    dense
  >


    <v-list-item-group
      v-for="(item, i) in menu_items"
      :key="i"
      active-class="deep-purple--text text--accent-4"
    >

      <v-list-group
        v-if="item.subMenu"
        :value="false"
        prepend-icon="mdi-account-circle"
      >

        <template v-slot:activator>
          <v-list-item-content>
            <v-list-item-title>{{item.title}}</v-list-item-title>
          </v-list-item-content>
        </template>
        <router-link style="text-decoration: none; color: inherit;"
                     :to=subItem.href
                     v-for="(subItem, si) in item.subMenu"
                     :key="si"
        >
          <v-list-item>
            <v-list-item-icon>
              <v-icon>{{subItem.icon}}</v-icon>
            </v-list-item-icon>
            <v-list-item-title>
              {{subItem.title}}
            </v-list-item-title>
          </v-list-item>
        </router-link>


      </v-list-group>

      <router-link style="text-decoration: none; color: inherit;"
                   :to=item.href
                   v-else
      >
        <v-list-item>

          <v-list-item-icon>
            <v-icon>{{item.icon}}</v-icon>
          </v-list-item-icon>
          <v-list-item-title>
            {{item.title}}
          </v-list-item-title>
        </v-list-item>
      </router-link>


    </v-list-item-group>

  </v-list>
</template>

<script>
  import {mapGetters} from "vuex";

  export default {
    name: "Menu",
    computed: {
      ...mapGetters({
        get_user_group: 'Login/currentUserGroup',
      }),
      user_group: {
        get() {
          return this.get_user_group;
        },
      },
      menu_items: {
        get() {
          return this.$store.getters["Menu/menu_items"];
        },
      },
    },
    methods: {
      //menu_items(){}
    },

  }
</script>

<style scoped>

</style>
