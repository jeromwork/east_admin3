//Для таблицы нужны headers и items
//для получения хедеров, нужно выбрать только разрешенные поля из acess
//так же еще будут настройки какие поля отображать (потом можно будет вынести эти настройки в одтельный компонент)
//items нужно получать с сервера

import {getTypes, momentSave} from '../../api/Reviews'

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
    reviewableTypes:[],
    dataIsInit : false,
  },
  mutations:{
    DATA_IS_INIT(state){
      state.dataIsInit = true;
    },
    FILL_REVIEWABLE_TYPES(state, types){
      state.reviewableTypes = types;
    },
    FILL_SPECIALS(state, specials){
      state.specials = specials;
    },
    SET_OPTIONS(state, options){
      console.log(options)
      state.requestOptions = options;
    },

    SET_TOTAL_COUNT_REVIEWS(state, count){
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
    init({state}){
      if(!state.dataIsInit){
        console.log(this)

        this.dispatch('Reviews/getTypes');
        this.commit('Reviews/DATA_IS_INIT');
      }

    },
    async momentSave(store, data){
      if(!data.id){
        console.log('Не передан id')
      }
      let id = data.id;
      delete data.id;
      momentSave(this, id, data);
    },

    async getReviews({state}){

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
    async getTypes(){
      getTypes(this);
    },

  },
  getters: {
    count :state => {
      return state.count;
    },
    getReviewableTypes : (state) => {
      return state.reviewableTypes;
    }

  },






}
