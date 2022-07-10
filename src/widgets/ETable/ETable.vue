<template>
  <div >

    <v-data-table
      dense
      :headers="getTableHeadItems"
      :items="items"
      item-key="id"
      :multi-sort="true"
      :server-items-length="totalCountItems"
      @update:options="setOptions"
      @dblclick:row="dblclickRow"
      :loading="loading"
    >
      <template v-for="slotName in Object.keys($scopedSlots)"
                v-slot:[slotName]="slotScope">
        <slot :name="slotName" v-bind="slotScope"></slot>
      </template>




      <template
              v-for="header in getTableHeadItemsNeedRender"
              v-slot:[`item.${header.value}`]="{ item }"

      >
        <multi-tags
                v-if="header.render.type == 'multiTags'"
                v-model="item[header.serverSettings.itemsName]"

                :key="header.value"
                :field="header.value"
                :serverSettings="header.serverSettings"
                :fieldSettins="header"

        ></multi-tags>

        <e-checkbox
                v-if="header.render.type == 'checkbox'"
                :key="header.value"
                :item="item"
                :field="header.value"
                :serverSettings="header.serverSettings"
        ></e-checkbox>


        <TextFieldAutoSave
                v-if="header.render && header.render.type == 'text'"
                :key="header.value"
                :url="urlApi"
                :field="header.value"
                :item="item"
                :label="header.render.label"

        />
        <e-textarea
          v-if="header.render && header.render == 'textarea'"
          :key="header.value"
          v-bind="header.props"
          v-model="item[header.value]"
          :itemId="item.id"
          :field="header.value"
        />
        <actions-field
          v-if="header.render && header.render == 'actions'"
          :key="header.value"
          v-bind="header.props"
          :item="item"
          :urlApi="urlApi"
          @removedItem="uploadItems()"
        />
        <e-select
          v-if="header.render && header.render == 'select'"
          :key="header.value"
          v-bind="header.props"
          v-model="item[header.value]"
          :field="header.value"
          :itemId="item.id"
        >
        </e-select>
        <rating
          v-if="header.render && header.render == 'rating'"
          :key="header.value"
          :itemId="item.id"
          v-bind="header.props"
          v-model="item[header.value]"
          :field="header.value"
        />
      </template>

    </v-data-table>

  </div>

</template>

<script>
    import ECheckbox from "../ECheckbox/ECheckbox.vue";
    import store from '../../store'
    import ETable from '../../store/modules/ETable/ETable.js'
    import MultiTags from "../../widgets/MultiTags/MultiTags.vue";
    import TextFieldAutoSave from "../TextFieldAutoSave/TextFieldAutoSave.vue";
    import Textarea from "../../widgets/Textarea/Textarea.vue"
    import ActionsField from "../../widgets/ETable/ActionsField/ActionsField.vue"
    import Rating from "../../widgets/Rating/Rating.vue"
    import ESelect from "../../widgets/ESelect/ESelect.vue";

    //const {state:  stateModule,getters, mutations} = ETable

    export default {
      components: {
        'e-checkbox' : ECheckbox,
        'multi-tags' : MultiTags,
        TextFieldAutoSave : TextFieldAutoSave,
        'e-textarea':Textarea,
        'actions-field' : ActionsField,
        'rating' : Rating,
        'e-select':ESelect
      },
        name: "ETable",
        props: {
          saveSettings:{
            component : String,
            item: String,
          },
          serverSettings:{
            items:String,
            action:String,

          },
          urlApi:{
            type:String
          },
          itemKey:{
            type:String,
          },
          fields:{type:Array, required: true},
          refreshItems:{type:Array},

        },
        data: function () {return {
          storeName: '',
          calories:'',
          search:'',
          loading:false,
        };},
      created() {
        this.initStoreModule();
      },
      methods: {
        uploadItems(){
          this.$store.dispatch(this.storeName + '/GET_ITEMS');
        },
        initStoreModule(){
          //при запуске компонента, создается новый vuex модуль, с уникальным именем
          //соответственно мутации и комиты будут через это уникальное имя модуля
          this.storeName = `ETable_${this.urlApi}`;
          store.registerModule(this.storeName, {
            ...ETable,
            component:'specials',
            namespaced: true,
          });
          this.$store.commit(this.storeName + '/SET_ETABLE_OPTIONS', {
            urlApi:this.urlApi,
            storeName:this.storeName,
          });

        },
        getItems(){
          this.loading = true;
          this.$store.dispatch(this.storeName + '/GET_ITEMS').then(() => {
              this.loading = false;
          });
        },
        setOptions(options){
          this.$store.commit(this.storeName + '/SET_OPTIONS', options);
          this.getItems();
        },

        dblclickRow(e,row){
          this.$emit('editItem', e, row.item)
        }
      },
      computed:{


        items:{
          get(){
            return this.$store.getters[this.storeName + "/getItems"];
          },
        },
        getTableHeadItems:{
          get(){
            return this.fields;
            //return this.$store.getters[this.storeName + "/getTableHeadItems"];
          },
        },
        getTableHeadItemsRenderCheckbox:{
          get(){
            let headers = this._.filter(this.getTableHeadItems, function(h) {
              return h.renderCheckbox; });
            //console.log(headers)
            return headers;
          },
        },
        getTableHeadItemsRenderMultiTags:{
          get(){

            let headers = this._.filter(this.getTableHeadItems, function(h) {
              return h.renderMultiTags; });
            //console.log(headers)
            return headers;
          },
        },
        getTableHeadItemsNeedRender:{
          get(){
            let headers = this._.filter(this.getTableHeadItems, function(h) {
              return h.render; });
            console.log(headers)
            return headers;
          },
        },
        totalCountItems:{
          get(){
            return this.$store.getters[this.storeName + "/getTotalCountItems"];
          },
        },
        refreshedItems:{
          get(){
            if(this.$store.getters[this.storeName + "/getRefreshedItems"].length === 0){
              this.$emit('refreshedItems');
            }
            return this.$store.getters[this.storeName + "/getRefreshedItems"];
          },
        },





      },
    watch:{
      fields(){
        // console.log(this.fields)
      },
      refreshItems(){
        this.$store.commit(this.storeName + '/SET_REFRESH_ITEMS', this.refreshItems);
        this.$store.dispatch(this.storeName + '/GET_ITEMS');
      },
    },

    }
</script>

<style scoped>

</style>
