//import axios from 'axios'


import axios from "axios";

export default {
  namespaced:true,
  state: {
    iservices_connector_url: (window.location.host === 'http://localhost:8080/') ? '/assets/components/eastclinic/east_filial/connector.php' : 'http://dev.eastclinic.local/assets/components/eastclinic/east_filial/connector.php',
    filialSettings: {},
  },
  actions:{
    async GET_FILIAL_SETTINGS_AJAX({getters, state}){
      let qdata = {
        action:'filials/get',
        cors_key:'8cbd6a0c2e767862b02887a446bb34ca',
        id:getters.currentDoctorId,
        //include_fields: {0:'*', bind:['eastdoc','iservices']}
      };


      axios

          .post(state.iservices_connector_url, qdata)
          .then(response => {this.info = response
            if(!response.data || !response.data.data[0])
            {
              console.log('Проверьте структуру данных доктора');
              return;
            }
            //
            this.commit('doctorSettings/FILL_DOCTOR_SETTINGS_DATA', response.data.data[0]);
          });
    },
  },






}
