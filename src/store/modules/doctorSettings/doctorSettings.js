import axios from 'axios'


export default {
  namespaced:true,
  mutations: {
    SET_CURRENT_DOCTOR_ID(state, val) {

      state.currentDoctorId = val;
      //this.GET_DOCTOR_SETTINGS_AJAX();
      //console.log(state);
    },
    FILL_DOCTOR_SETTINGS_DATA(state, doctor) {
      //console.log(doctor);
      state.doctorSettings = doctor;
      if(state.doctorSettings.bind && Array.isArray(state.doctorSettings.bind && state.doctorSettings.bind.length === 0)){
        //
        state.doctorSettings.bind = {};
      }


      let binds = state.doctorSettings.bind;
      if(Array.isArray(state.doctorSettings.bind) && state.doctorSettings.bind.length === 0){
        state.doctorSettings.bind = {};//если bind пустой, преобразуем массив в объект
      }else if(!Array.isArray(state.doctorSettings.bind)){
        for (let component in binds){
          if(!binds[component]){continue;}
          for (let processor in binds[component]){
            if(!binds[component][processor]){continue;}
            for (let group in binds[component][processor]) {
              state.doctorSettings.bind[component][processor][group] = binds[component][processor][group].map( item => {return item['tag']*1;});
              //
            }
          }
        }
      }



      },
    SET_DOCTOR_TAGS(state, tags ={}) {

      if (!tags.group_map[0] || !tags.group_map[1] || !tags.group_map[2])
        {
          return;
        }

      //state.doctorSettings.bind =
      console.log(state.doctorSettings.bind);
      console.log(tags.data);
      if(!state.doctorSettings.bind[tags.group_map[0]]){
        state.doctorSettings.bind[tags.group_map[0]] = {};
      }
      if(!state.doctorSettings.bind[tags.group_map[0]][tags.group_map[1]]){
        state.doctorSettings.bind[tags.group_map[0]][tags.group_map[1]] = {};
      }
      //let data = tags['data'];

      state.doctorSettings.bind[tags.group_map[0]][tags.group_map[1]][tags.group_map[2]] = tags['data'] ;


      },
    SET_LIST_DOCTORS(state, doctors) {

      if(!Array.isArray(doctors)){console.log('необходимо передать массив');}

      state.doctors = doctors;
//здесь преобразуем присланный массив в формате сервера в формат нужный для select
//       state.doctors= doctors.map(function (doc) {
//        // console.log(doc);
//         return {value:doc.doc__id, text:doc.doc__fullname};
//       });


    },
  },
  actions:{

    async GET_DOCTORS_AJAX({state}){

      let qdata = {
        action:  'doctors/get',
        cors_key : '8cbd6a0c2e767862b02887a446bb34ca',
        include_fields : {doc__id:'value', doc__fullname:'text'},
        length : 1000,
      };
      // console.log(qdata);
      // console.log(state);
      axios
          .post(state.iservices_connector_url, qdata)
          .then(response => {this.info = response

            console.log(response.data);
            this.commit('doctorSettings/SET_LIST_DOCTORS', response.data.data);
            //
          }).catch(error => console.log(error+'error'));
    },
    async GET_DOCTOR_SETTINGS_AJAX({getters, state}){
      let qdata = {
        action:'doctors/get',
        cors_key:'8cbd6a0c2e767862b02887a446bb34ca',
        id:getters.currentDoctorId,
        include_fields: {0:'*', bind:['eastdoc','iservices']}
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
    async SAVE_DOCTOR_SETTINGS_AJAX({getters, state}){

      let qdata = {
        ...state.doctorSettings,
        action:'doctors/set',
        cors_key:'8cbd6a0c2e767862b02887a446bb34ca',
        id:getters.currentDoctorId};

      //console.log(qdata);
      axios

          .post(state.iservices_connector_url, qdata)
          .then(response => {this.info = response

            //this.commit('doctorSettings/FILL_DOCTOR_SETTINGS_DATA', response.data);
          });
    },
    async WS({state}, data){

      state.doctorSettings.ws.send(JSON.stringify(data));

    },

    async WS_INIT({ state }){
      state.doctorSettings.ws = new WebSocket('ws://127.0.0.1:61523');
    },

  },
  state: {
    iservices_connector_url:(window.location.host === 'http://localhost:8080/')? '/assets/components/eastclinic/eastdoc/connector.php': 'http://dev.eastclinic.local/assets/components/eastclinic/eastdoc/connector.php',
    doctorSettings: {},
    doctors:[
      {id:0, name:'Выберите доктора'}
    ],
    ws:{},
    currentDoctorId:1,
    arrChildAge:[
      {value:'-1', text:'Не работает с детьми'},
        {value:'0', text:'Новорожденный'},
      {value:'1', text:'с 1го месяца'},
      {value:'2', text:'с 2 месяцев'},
      {value:'3', text:'с 3 месяцев'},
      {value:'4', text:'с 4 месяцев'},
      {value:'5', text:'с 5 месяцев'},
      {value:'6', text:'с 6 месяцев'},
      {value:'7', text:'с 7 месяцев'},
      {value:'8', text:'с 8 месяцев'},
      {value:'9', text:'с 9 месяцев'},
      {value:'10', text:'с 10 месяцев'},
      {value:'11', text:'с 11 месяцев'},
      {value:'12', text:'с детьми от года'},
      {value:'13', text:'с детьми от полутора лет'},
      {value:'14', text:'с детьми от 2 лет'},
      {value:'15', text:'с детьми от 3 лет'},
      {value:'16', text:'с детьми от 5 лет'},
      {value:'17', text:'с детьми от 5 лет'},
      {value:'18', text:'с детьми от 6 лет'},


    ],
    arrChildAge2:[
      {value:'-1', text:'Не работает с детьми'},
      {value:'0', text:'Новорожденный'},
      {value:'1', text:'с 1го месяца'},
      {value:'2', text:'с 2 месяцев'},
      {value:'3', text:'с 3 месяцев'},
      {value:'4', text:'с 4 месяцев'},
      {value:'5', text:'с 5 месяцев'},
      {value:'6', text:'с 6 месяцев'},
      {value:'7', text:'с 7 месяцев'},
      {value:'8', text:'с 8 месяцев'},
      {value:'9', text:'с 9 месяцев'},
      {value:'10', text:'с 10 месяцев'},
      {value:'11', text:'с 11 месяцев'},
      {value:'12', text:'с детьми от года'},
      {value:'13', text:'с детьми от полутора лет'},
      {value:'14', text:'с детьми от 2 лет'},
      {value:'15', text:'с детьми от 3 лет'},
      {value:'16', text:'с детьми от 5 лет'},
      {value:'17', text:'с детьми от 5 лет'},
      {value:'18', text:'с детьми от 6 лет'},


    ],
  },
  getters: {
    getDoctors: state => {        return state.doctors;      },
    getArrChildAges: state => {        return state.arrChildAge;      },
    //todo разобраться почему currentDoctorId is not a function
    currentDoctorId: state => {        return state.currentDoctorId;      },
    doctorSettings: state => {        return state.doctorSettings ;      },
    tagsSelected: state => (component, processor, group) =>  {
      if(state.doctorSettings['bind'] && state.doctorSettings['bind'][component]){
        console.log(state.doctorSettings['bind'][component]);
        console.log(component, processor, group);
      }


        if(state.doctorSettings['bind'] && state.doctorSettings['bind'][component]
            && state.doctorSettings['bind'][component][processor] && state.doctorSettings['bind'][component][processor][group]){



                if(Array.isArray(state.doctorSettings['bind'][component][processor][group])){
                  console.log('array');
                }else{
                  console.log('object');
                }

          return state.doctorSettings['bind'][component][processor][group] ;
        }else{
          return [];
        }
      },
  },








}
