<template>
  <v-container fluid>
    <v-card>
      <!--Компоненту e-table передается только url а дальше он уже сам работает с сервером-->
      <e-table
        urlApi="reviews"
        dense
        item-key="id"
        @editItem="editItem"
        :fields="eTableFields"
        :refreshItems="refreshItems"
        @refreshedItems="refreshItems=[]"

      >
        <template v-slot:top>
<!--          В top нужно добавить кнопку создания сущности и панель фильтрации-->
          <v-btn
            elevation="2"
            raised
            @click="editItem($event, {})"
          >Новый отзыв</v-btn>
          <v-text-field
            v-model="search"
            label="Search"
            class="mx-4"
          ></v-text-field>
        </template>

      </e-table>

      <edit :toogle="showEditDialog"
              @close="showEditDialog=false"
              @save="savedItemUpdateDataTable"
              :fields="eEditFields"
              :item="currentEditItem"
              urlApi="reviews"
      >
      </edit>

    </v-card>
  </v-container>

</template>

<script>
  import ETable from "../../widgets/ETable/ETable.vue";
  import Edit from "./Edit.vue";

  export default {
        name: "ReviewsData",
        components: {
          'edit' : Edit,
          'e-table' : ETable,
        },
        data: ()=>({
            items:{},
          search:'',
          calories:'',
            showEditDialog:false,
            currentEditItem : {},
          refreshItems:[],
        }),

      created() {
        this.$store.dispatch('Reviews/init');//инициализируем reviews из store
        this.$store.dispatch('Doctors/init');//инициализируем doctors из store
      },
      computed:{
        eTableFields:{
          get(){
            return  this.$store.getters['Access/getAllowedFields']('ReviewsTable');
          },
        },
        eEditFields:{
          get(){
            return  this.$store.getters['Access/accessRules']('ReviewsEdit');
          },
        },
      },
      methods:{
        editItem(e, item){
          this.showEditDialog = true
          this.currentEditItem = item;
        },
        savedItemUpdateDataTable(id){
          //this.showEditDialog=false;
           console.log(id)
          //после сохранения сущности, обновляем с сервера только одну эту сущность
          this.refreshItems = [id];
        },
      },


    }
</script>

<style scoped>

</style>
