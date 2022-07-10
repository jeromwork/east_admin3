import {initStoreData} from '../../api/Doctors.js'
import _ from 'lodash'
//для сущностей store можно завести списки доступа, и отдавать доступные данные
export default {
  namespaced:true,
  state: () => ({
    doctors: {},
  }),
  mutations: {

    FILL_ITEMS(state, items) {
      let doctors = {}
      items.forEach((item) => {
        doctors[item.id*1] = item;
      });
      state.doctors = doctors;
    },
  },
  actions:{
    async init(){
      initStoreData(this, {itemsPerPage:1000});
    },
  },

  getters: {
    get: state => {
      return state.doctors;
    },
    getIdText : state => {
      return _.map(state.doctors, (doctor) => {
        return {id : doctor.id, text : doctor.fullname}
      });
    },
  },








}
