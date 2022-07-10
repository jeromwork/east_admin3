<template>

    <v-autocomplete
            hide-selected
            outlined
            small-chips
            :loading="loading"
            v-model="model"
            :items="itemsLocal"

            :disabled="disabled"
            @focus="getItems"
            :deletable-chips="true"
            :auto-select-first="true"
            :search-input.sync="search"
            :menu-props="{ offsetY: true, }"
            :hide-no-data="true"
            :label="label"
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
  import SelectOptions from '../../store/modules/Select/SelectOptionsFromServer'


  export default {

        name: 'ESelect',
          props: {
            value:{required: false},
            server:{
                urlGet : {type:String|Array, required: false},
                urlSet: {type:String, required: false},
              required:true,
            },
            url:{type:String, required: false},
            settings:{type:Object},//В этот проп можно напрямую передать параметры, тогда не надо их прописывать при вызове ESelect
            items:{required: false},
            field:{type:String},
            label:{type:String},
            dense:{type:Boolean, default:false},
        },

        components: {

        },
        data: () => ({
            //value:[],
            values: {} ,
            select:null,
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
            if(!this.items){
              this.$store.dispatch(`${this.storeName}/getInfoIssetValues`);
            }
          },

          created(){

            //при создании ВСЕХ multiTags собираются все Ids и сохраняются в объект в Store.
            //в mounted идет обращение на сервер, что бы выдали title тэгов по их ids.
            //затем, при каждом обращении к серверу, кэшируются titles, Для отображения тэгов
            //v-model multiTags, выдает массив ids, который можно уже сохранить на сервере

            if(!this.items) {
              this.initStoreModule();
              //console.log('created')

              this.$store.commit(`${this.storeName}/SET_IDS`, this.model);
            }
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
          itemsLocal : {
            get(){
              if(this.items){ return this.items;}
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
              this.storeName = `MultiTags_${this.server.urlGet}`;
              if(!store.hasModule(this.storeName)){
                  store.registerModule(this.storeName, {
                      ...SelectOptions,
                      //component: this.server.component,
                      namespaced: true,
                  });
              }
              this.$store.commit(this.storeName + '/SET_STORE_OPTIONS', {
                  url:this.server.urlGet,
                  storeName:this.storeName,
              });

          },
          onInput(val){
              this.$emit('input', val);
          },
          onOpen(){
              console.log('onOpen')
          },
          getItems(searchKey){
            if(this.items){ return this.items;}
            this.$store.dispatch(`${this.storeName}/getItemsFromServer`, {searchKey:searchKey});
          },
      },


    }
</script>

<style scoped>

</style>
