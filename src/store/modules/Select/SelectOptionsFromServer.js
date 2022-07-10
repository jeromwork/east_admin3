import _ from 'lodash';
export default {
  namespaced:true,
  state() {return {
    ids:{},
    items:[
    ],
    issetValues:[],
    storeName:'',
    serverSettings:{
      storeName:'',
      url:'',
    },
    url: '',
    requestOptions:{fields:['id', 'name']},
    selectItems:[],
  }},
//===========================================================

  mutations: {
    SET_STORE_OPTIONS(state, options){
      if(!options.storeName || !options.url){
        throw new Error('Неправильный массив опций, для настройки модуля SelectOptions.js');
      }
      //state = {...state,  ...options};

      console.log({...state})
      state.storeName = options.storeName;
      state.url = options.url;
    },
    SET_IDS(state, ids) {
      _.map(ids, (id) => {
        state.ids[id] = id;
      });

    },
    FILL_ITEMS(state, data){
      if(!Array.isArray(data)){
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
      let requestData = { };
      if(data && data.ids && _.values(data.ids).length > 0 ){requestData.ids = _.values(data.ids);}

      this.$http.get('api/' + state.url, {params:{...data, ...requestData}} )
          .then(response => {this.info = response
            if( !response.data || !response.data.data )
            {
              console.log('Проверьте структуру данных Специальностей');
              return;
            }
            //console.log(response.data.items)
             this.commit(state.storeName + '/FILL_ITEMS', response.data.data);
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
