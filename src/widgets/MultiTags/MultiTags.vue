<template>

    <v-autocomplete
            hide-selected
            multiple
            outlined
            small-chips
            :loading="loading"
            v-model="model"
            :items="items"

            :disabled="disabled"
            @focus="getItems"
            :deletable-chips="true"
            :auto-select-first="true"
            :search-input.sync="search"
            :menu-props="{ offsetY: true, }"
            :hide-no-data="true"
            :label="label"
            item-text="name"
            item-value="id"
            @open="onOpen"
            :loader-height="10"
            :cache-items="true"
            @input="onInput"
    ></v-autocomplete>

</template>





<script>


    /*

    *
    * */
  import store from "../../store";
  import MultiTags from '../../store/modules/MultiTags/MultiTags'


  export default {

        name: 'MultiTags',
          props: {
            tagsSelected: {
                type: Array,
            },
            tag:{
                type: String,
            },
            value:{type: Array},
            serverSettings:{
                component : {type:String, required: true},
                item: {type:String, required: true},
                action:{type:String, },
                placeholder:{type: String, },
                fields:{type:Array, },
              required:true,
            },

          fieldSettins:{
            type: Object,
            required:true,
          },
          label:{type:String},
        },

        components: {

        },
        data: () => ({
            //value:[],
            values: {},
            //items: [],
            select:[],
            info:{},
            searchInput:null,
            selected:{},
            loading:false,
            disabled:false,
            search: null,
            storeName:'',
            defaultValues:[],
        }),

      mounted() {
          this.$store.dispatch(`${this.storeName}/getInfoIssetValues`);
      },

        created(){
          //при создании ВСЕХ multiTags собираются все Ids и сохраняются в объект в Store.
          //в mounted идет обращение на сервер, что бы выдали title тэгов по их ids.
          //затем, при каждом обращении к серверу, кэшируются titles, Для отображения тэгов
          //v-model multiTags, выдает массив ids, который можно уже сохранить на сервере
            this.initStoreModule();
            //console.log('created')

          this.$store.commit(`${this.storeName}/SET_IDS`, this.model);

        },


        watch: {
            search(val) {
                this.getItems(val);
                // Items have already been loaded
                if (this.items.length > 0) return


                // Items have already been requested
                if (this.isLoading) return

                this.isLoading = true

                return;
            },

        },
        computed:{
          items : {
            get(){
              return this.$store.getters[`${this.storeName}/getItems`]
            }
          },
            model: {
                get() {
                    return this.value;
                },
                set(value) {
                    this.$emit('input', value);
                },
            },
        },
      methods: {

          initStoreModule(){
              //при запуске компонента, создается новый vuex модуль, с уникальным именем
              //соответственно мутации и комиты будут через это уникальное имя модуля
              this.storeName = `MultiTags_${this.serverSettings.itemsName}`;
              if(!store.hasModule(this.storeName)){
                  store.registerModule(this.storeName, {
                      ...MultiTags,
                      component: this.serverSettings.component,
                      namespaced: true,
                  });
              }
              this.$store.commit(this.storeName + '/SET_STORE_OPTIONS', {
                  itemsName:this.serverSettings.itemsName,
                  storeName:this.storeName,
                  actionGet:this.serverSettings.actionGet,
                  component:this.serverSettings.component,
              });

          },
          onInput(val){
              this.$emit('input', val);
          },
          onOpen(){
              console.log('onOpen')
          },
          getItems(searchKey){
            this.$store.dispatch(`${this.storeName}/getItemsFromServer`, {searchKey:searchKey});
          },
          getItemType(){
                if(!this.serverSettings.itemsName || !this.serverSettings.component){
                    throw new Error('Неправильные настройки serverSettings для виджета MultiTags. Нет itemName или component')
                }
              return this.serverSettings.component + '_' +this.serverSettings.itemsName;
          },

      },


    }
</script>

<style scoped>

</style>
