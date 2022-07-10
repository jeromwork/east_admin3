
export default {
  namespaced:true,

  state: {
    component:'health',
    filialSettings: {},
  },
  mutations:{

  },
  actions:{
    // async GET_ITEMS({state}, data){
    //
    //   console.log(2222)
    //   console.log(state)
    //   console.log(data)
    //   // if(!data.type){
    //   //   return ;
    //   // }
    //
    //   this.$http.post(this.$http.CONNECTOR_URL, { action:  data.type + '/getVue', component:state.component  })
    //       .then(response => {this.info = response
    //         if(!response.data || !response.data.data[0])
    //         {
    //           console.log('Проверьте структуру данных');
    //           return;
    //         }
    //         this.commit('HealthSetting/FILL_HEALTH_DATA', response.data.data[0]);
    //       });
    // },
  },
  getters: {
    getHealthDataItems: (state, settings) => {
      console.log(settings)
      return [];
    },
    // getAccessRules: () => {
    //   console.log('getAccessData!!!');
    //   return AccessRules
    //
    //       //список доступа составляется вручную из интерфейса
    //   //затем можно для каждой группы доступа назначить
    // },

    getHeadsTable : () => {

    },


  },






}
