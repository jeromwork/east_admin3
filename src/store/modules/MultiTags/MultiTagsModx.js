import _ from 'lodash';
export default {
  namespaced:true,
  state: {
    ids:{},
    items:[
    ],
    issetValues:[],
    storeName:'',
    serverSettings:{
      storeName:'',
      component:'',
      itemsName:'',
      actionGet:'',

    },
    requestOptions:{fields:['id', 'name']},
    selectItems:[],
  },
//===========================================================

  mutations: {
    SET_STORE_OPTIONS(state, options){
      if(!options.storeName || !options.component || !options.itemsName || !options.actionGet){
        throw new Error('Неправильный массив опций, для настройки модуля MultiTags.js');
      }
      state.serverSettings = { ...options };
      state.storeName = options.storeName;
    },
    SET_IDS(state, ids) {
      _.map(ids, (id) => {
        state.ids[id] = id;
      });

    },
    FILL_ITEMS(state, data){
      if(!Array.isArray(data) || !data[0]['id']){
        throw new Error('Неправильная структура данных с сервера. Должен быть массив и каждый элемент содержать поле id');
      }


      let issetItems = {}
//мы должны проверить что нет дублирующихся items
      _.map( state.items, (item) => {
        issetItems[item['id']] = item;
      });
      _.map(data, (item) => {
        issetItems[item['id']] = item;
      });

      state.items = _.values(issetItems);
    },
  },
//=============================================================
  actions:{
    //метод проверяет имеются ли в store ждущие информации ids
    async getInfoIssetValues({state}){
      if(Object.keys(state.ids).length === 0){
        return;
      }
      this.dispatch(`${state.storeName}/getItemsFromServer`, {ids:state.ids});
      state.ids = {};
    },
    async getItemsFromServer({state}, data){

      let requestData = {
        // action:  this.serverSettings.item + '/' + this.serverSettings.getAction,
        action:  state.serverSettings.actionGet,
        component:state.serverSettings.component,
        requestOptions:{
          fields:(state.serverSettings.fields) ? state.serverSettings.fields : ['id', 'name'],
        },
      };
      if(data && data.ids && _.values(data.ids).length > 0 ){requestData.ids = _.values(data.ids);}
      if(data && data.searchKey && data.searchKey !== ''){
        requestData.search = data.searchKey;
      }
      this.$http.post(this.$http.CONNECTOR_URL, requestData )
          .then(response => {this.info = response
            if(!response.data || !response.data.items || !response.data.count)
            {
              console.log('Проверьте структуру данных Специальностей');
              return;
            }
            //console.log(response.data.items)
             this.commit(state.storeName + '/FILL_ITEMS', response.data.items);
          });
    }
  },
//==========================================================

  getters: {
    getItems: (state )  => {
      //console.log(state.items)
      return state.items;



      },

  },








}
