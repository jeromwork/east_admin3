//Для таблицы нужны headers и items
//для получения хедеров, нужно выбрать только разрешенные поля из acess
//так же еще будут настройки какие поля отображать (потом можно будет вынести эти настройки в одтельный компонент)


//items нужно получать с сервера


//Общие правила работы


//настройка запроса на выдачу данных ведется через queryBuilder объект.
//таким образом можно посмотреть, какие настройки доступны
//для разных запросов возможно потребуются различные ЗапросБилдер объекты
//какие ЗапросБилдер объекты выдавать решает каждый из Сторов сам

//При загрузке данных, возможно будут вложенные сущности, в виде массива ids
//сразу же нужно подгрузить их, если есть соответствующие Store
//можно напрямую брать названия сущностей и обращаться к Store,
//либо через таблицу соответствий
//значит, корневой Store, должен позаботится о подгрузке вложенных сущностей
//напрямую он не знает об их Store, но будет обращаться через строковое название.
//значит корневой Стор, знает о вложенных сущностях только их строковые названия
//и корневые Сторы должны поддерживать интерфейс, для подгрузки сущностей

//Правила кэша Стора
//Можно задать максимальное количество items в кэше
//При запросах на сервер, он выдает общее количество сущностей на сервере


//Если нужно отфильтровать или сделать поиск
//если на сервере больше сущностей чем в кэше,
//значит отправляем запрос на сервер
//он возвращает массив сущностей,
//Стор сливает этот массив с кэшем

//если в Сторе все сущности из сервера
//значит фильтрация, поиск, сортировка идет по сущностям из самого Стора

//при фильтрации, сортировке и тд, возможно часть сущностей, которые нужные другим сущностям, затрутся
//этого нельзя допустить
//возможно нужно сделать спец массив в определенном Сторе, в котором будут хранится ids необходимых сущностей
//и их нельзя будет затирать
//но тут возникают сложности, как поддерживать этот массив в актуальном состоянии
//до тех пор пока не пришлют запрос к данному Стор что можно удалить данные ids







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
