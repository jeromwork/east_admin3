<template>

    <v-autocomplete
            hide-selected
            outlined
            :loading="loading"
            v-model="model"
            :items="itemsLocal"

            :disabled="disabled"
            :auto-select-first="true"
            :menu-props="{ offsetY: true, }"
            :search-input="search"
            :hide-no-data="true"
            :label="label"
            @open="onOpen"
            :loader-height="10"
            :cache-items="true"
            @input="onInput"
            item-value="id"
    ></v-autocomplete>

</template>





<script>

// import _ from 'lodash';
  export default {

        name: 'ESelect',
          props: {
            value:{required: false},
            url:{type:String, required: false},
            items:{required: false},
            field:{type:String},
            label:{type:String},
            requestData:{type:Object},
            dense:{type:Boolean, default:false},
            storeModule:{type:String},
            urlSet:{type:String},
            momentSave: {type:Boolean, default:false},
            dispatchStore:{type:Object,

            getItems:{type:String}
            }
        },

        components: {

        },
        data: () => ({
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
          },

          created(){

            //при создании ВСЕХ multiTags собираются все Ids и сохраняются в объект в Store.
            //в mounted идет обращение на сервер, что бы выдали title тэгов по их ids.
            //затем, при каждом обращении к серверу, кэшируются titles, Для отображения тэгов
            //v-model multiTags, выдает массив ids, который можно уже сохранить на сервере

            // if(!this.items) {
            //   this.getItems();
            // }
          },


        watch: {
            search(val) {
              console.log(val)
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
              if(this.dispatchStore && this.dispatchStore.getItems ){
                if(!(this.dispatchStore.getItems in this.$store.getters)){
                  console.log('Нет такого геттера '+ this.dispatchStore.getItems + ', в store.getters');
                }
                return this.$store.getters[this.dispatchStore.getItems];
              }else{
                return [];
              }
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

          onInput(val){
              this.$emit('input', val);
          },
          onOpen(){
              console.log('onOpen')
          },
          // getItems(searchKey){
          //   console.log(searchKey)
          //   console.log('сделать поиск по items')
          //   // if(this.items){ return this.items;}
          //   // this.$store.dispatch(`${this.storeName}/getItemsFromServer`, {searchKey:searchKey, ...this.requestData});
          // },
      },


    }
</script>

<style scoped>

</style>
