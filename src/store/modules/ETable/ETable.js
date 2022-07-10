import _ from 'lodash';

//Для таблицы нужны headers и items
//для получения хедеров, нужно выбрать только разрешенные поля из acess
//так же еще будут настройки какие поля отображать (потом можно будет вынести эти настройки в одтельный компонент)
//items нужно получать с сервера
//import AccessMap from './acess/healthSpecialsETable'

//import AccessMap from "../HealthSettings/acess/healthSpecialsETable";

export default {
    namespaced:true,

    state: {
        component:'', //компонент на сервере
        urlApi:'',
      storeName : '',
        itemsName:'',
        Items:[],
        limit: 10,
        offset:0,
        count:10,
        page:1,
        countOfPage:10,
        requestOptions:{page:1, itemsPerPage:10},
        refreshItems:[],
    },
    mutations:{

        SET_OPTIONS(state, options){
            state.requestOptions = options;
        },
        FILL_ITEMS(state, items){

          console.log(11111)
            //если в массив ids которых надо обновить не пуст
            //значит обновляем только те items которые нужно обновить
            if(state.refreshItems.length > 0){
                let existItems = [];

                let mapRefreshItems = {};
                _.map(state.refreshItems, (id) => {
                    mapRefreshItems[id] = id;
                });

                let mapItemsFromServer = {};
                _.map(items, (item) => {
                    if(!item.id){
                        throw new Error('Проверить структуру данных с сервера для ETable')
                    }
                    mapItemsFromServer[item.id] = item;
                });



                _.map(state.Items, (item) => {
                    if(mapRefreshItems[item.id] && mapItemsFromServer[item.id]){
                        existItems.push(mapItemsFromServer[item.id]);
                    }else {
                        existItems.push(item);
                    }
                });

                state.Items = existItems;
              console.log({...state})
                state.refreshItems = [];
                return;
            }

            state.Items = items;
        },
        SET_TOTAL_COUNT_ITEMS(state, count){
            state.count = count;
        },
        SET_ETABLE_OPTIONS(state, options){
            if(!options.urlApi ){
                throw new Error('Неправильный массив опций, для настройки модуля ETable.js', 16);
            }
            state.urlApi = options.urlApi;
            state.storeName = options.storeName;
        },
        SET_REFRESH_ITEMS(state, ids){
            if(ids.length > 0){
                state.refreshItems = ids;
            }

        },

    },
    actions:{
        async GET_ITEMS({state}){

          let requestData = {};
          if(state.requestOptions){
            requestData = {...state.requestOptions};
          }

            if(state.refreshItems.length > 0){
                requestData['ids'] = state.refreshItems;
            }

            this.$http.get('api/' + state.urlApi, {params:{...requestData}} )
                .then(response => {this.info = response

                    if( !response?.data?.data )
                    {
                        console.log('Проверьте структуру данных Отзывов');
                        return true;
                    }
                    this.commit(state.storeName + '/FILL_ITEMS', response.data.data);
                    if(response.data?.count){
                      this.commit(state.storeName + '/SET_TOTAL_COUNT_ITEMS', response.data.count);
                    }

                });
        },
    },
    getters: {
        getItems : state => {
            return state.Items;
        },
        getTotalCountItems :state => {
            return state.count;
        },
        getRefreshedItems :state => {
            return state.refreshItems;
        },
    },






}
