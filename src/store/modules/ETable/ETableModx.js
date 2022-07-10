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
        id:'',
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
                state.refreshItems = [];
                return;
            }

            state.Items = items;
        },
        SET_TOTAL_COUNT_ITEMS(state, count){
            state.count = count;
        },
        SET_ETABLE_OPTIONS(state, options){
            if(!options.id || !options.component || !options.itemsName || !options.action){
                throw new Error('Неправильный массив опций, для настройки модуля ETable.js', 16);
            }
            state.id = options.id;
            state.component = options.component;
            state.itemsName = options.itemsName;
            state.action = options.action;
            console.log(state.id)
        },
        SET_REFRESH_ITEMS(state, ids){
            if(ids.length > 0){
                state.refreshItems = ids;
            }

        },

    },
    actions:{
        async GET_ITEMS({state}){

            let requestData = {
                action:  state.itemsName + '/getVue',
                component:state.component,
                limit:state.requestOptions.itemsPerPage,
                offset: (state.requestOptions.page * state.requestOptions.itemsPerPage) - state.requestOptions.itemsPerPage,
                requestOptions:state.requestOptions,
            };
            if(state.refreshItems.length > 0){
                requestData['ids'] = state.refreshItems;
            }


            this.$http.post(this.$http.CONNECTOR_URL, requestData )
                .then(response => {this.info = response
                    if(!response.data || !response.data.items || !response.data.count)
                    {
                        console.log('Проверьте структуру данных Специальностей');
                        return;
                    }

                    this.commit(state.id + '/FILL_ITEMS', response.data.items);
                    this.commit(state.id + '/SET_TOTAL_COUNT_ITEMS', response.data.count);
                });
        },
    },
    getters: {
        getItems : state => {
            console.log('etablegetItems')
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
