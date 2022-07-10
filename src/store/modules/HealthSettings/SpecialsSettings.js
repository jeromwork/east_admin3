export default {
    namespaced:true,

    state: {
        component:'health', //компонент на сервере
        specials:[],
        limit: 10,
        offset:0,
        count:10,
        page:1,
        countOfPage:10,
        requestOptions:{page:1, itemsPerPage:10},
    },
    mutations:{
        FILL_SPECIALS(state, specials){
            state.specials = specials;
        },
        SET_OPTIONS(state, options){
          console.log(options)
          state.requestOptions = options;
        },

        SET_TOTAL_COUNT_SPECIALS(state, count){
            state.count = count;
        },
        SET_PAGINATION_PAGE(state, page){
            state.page = page;
        },
        SET_OFFSET(state, offset){
            state.offset = offset;
        },
        SET_COUNT_OF_PAGE(state, count){
            state.limit = count;
        },
    },
    actions:{
        async GET_SPECIALS({state}){

            let requestData = {
                action:  'specials/getVue',
                component:state.component,
                limit:state.requestOptions.itemsPerPage,
                offset: (state.requestOptions.page * state.requestOptions.itemsPerPage) - state.requestOptions.itemsPerPage,
              requestOptions:state.requestOptions,
            };


            this.$http.post(this.$http.CONNECTOR_URL, requestData )
                .then(response => {this.info = response
                    if(!response.data || !response.data.items || !response.data.count)
                    {
                        console.log('Проверьте структуру данных Специальностей');
                        return;
                    }

                    this.commit('SpecialsSettings/FILL_SPECIALS', response.data.items);
                    this.commit('SpecialsSettings/SET_TOTAL_COUNT_SPECIALS', response.data.count);
                });
        },
    },
    getters: {
        getSpecials : state => {
          console.log('getSpecials')
            return state.specials;
        },

        getTableHeadItems: (state, getters,rootState, rootGetters) =>  {
          return  rootGetters['Access/getAllowedFields']('healthSpecialsSettings');
        },
        getEditFields: (state, getters,rootState, rootGetters) => {
          return  rootGetters['Access/getAllowedFields']('healthSpecialsEditFields');
        },

        getTotalCountSpecials :state => {
            return state.count;
        }

    },






}
