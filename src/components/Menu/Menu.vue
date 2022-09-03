<template>
  <v-list
    nav
    dense
  >


    <v-list-group
            v-for="(item, i) in menu_items"
            :key="i"
    >
      <template v-slot:activator="{ props }" v-if="!item.subMenu">
        <router-link :to=item.href style="text-decoration: none; color: inherit;">
          <v-list-item :prepend-icon="item.icon" :title="item.title"></v-list-item>
        </router-link>
      </template>


      <template v-slot:activator="{ props }" v-else>

        <v-list-group>
          <template v-slot:activator="{ props }">

            <v-list-item
                    v-bind="props"
                    :title="item.title"
                    :prepend-icon="item.icon"
            ></v-list-item>
          </template>
          <router-link style="text-decoration: none; color: inherit;"
                       v-for="(subItem, i) in item.subMenu"
                       :key="i"
                       :to=subItem.href
          >
            <v-list-item

                    :title="subItem.title"
                    :value="subItem.title"
            ></v-list-item>
          </router-link>

        </v-list-group>

      </template>


    </v-list-group>

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
