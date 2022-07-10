import router from '../../../router'
import _ from 'lodash'

export default {
    namespaced:true,
    state: {
        items:[
            {
                value:0,
                text: '',
            }
        ],
        current_user_group : 'clinic_admin',//текущую группу пользователь может выбирать сам
        //по этой группе сервер решает какие можно отдавать данные
        //по выбранной группе строится интерфейс, в частности app barы
        selectItems:[],
        userData:{},
        userAnonim:true,
        user_groups:[],
        iservices_connector_url:(window.location.host === 'http://localhost:8080/')? '/assets/components/eastclinic/login/connector.php': 'http://dev.eastclinic.local/assets/components/eastclinic/login/connector.php',
      serverErrors:{email:'',
                    password:'',
                    name:'',
                    },
    },
//===========================================================

    mutations: {
        SET_USER_DATA(state, userData) {
            if(!Array.isArray(userData)){console.log('необходимо передать массив');}
            state.userData = userData;
            state.userAnonim = false;
            state.user_groups = ( userData.user_groups ) ? userData.user_groups : [];
        },
        DOENTER(state,loginData) {

            if(!loginData.login || !loginData.password){
                console.log('Неправильные данные для входа. Должен быть логин и пароль');
                return;
            }
            this.dispatch('Login/enterToSystem',loginData);
        },
        DOLOGOUT(state) {
            // localStorage.removeItem('jwt');
            localStorage.removeItem('access_token');
            state.userAnonim = true;
            router.push('/');
        },
      SET_ACCESS_TOKEN(state, token){
        console.log(token)
        localStorage.setItem('access_token', token);
        state.userAnonim = false;
      },
      SET_SERVER_ERRORS(state, errors){
        errors = (!errors) ? {} : errors;
        let updatedErrors = {};


        _.forEach(state.serverErrors, (errorMessage, field) => {
          if(errors[field]){
            updatedErrors[field] = errors[field].join(', ');
          }else{
            updatedErrors[field] = '';
          }
        })
        state.serverErrors = updatedErrors;
      },

    },
//=============================================================
    actions:{
        async enterToSystem({state}, formData){
            let qdata = {
              ...formData,

                'rememberme': 1,
             };
          console.log(state)
            this.$http
                .post('api/auth/login', qdata)
                .then(response => {
                  this.info = response
                  if(response.data && response.data.access_token){
                    this.commit('Login/SET_ACCESS_TOKEN', response.data.access_token);
                  }
                }).catch( (error) => {
                  if(error.response.status === 422 && error.response.data){//ошибка заполнения полей
                    this.commit('Login/SET_SERVER_ERRORS', error.response.data);
                  }


                });
        },
        async registerInSystem({state}, formData){

          let qdata = {
            ...formData,
            'rememberme': 1,
             };

          console.log(formData)
          console.log(qdata)

          console.log(state)

          this.$http
            .post('api/auth/register', qdata)
            .then(

              response => {
                console.log(response);
              // this.info = response
              // if(response.data && response.data.ok === false){
              //   loginData.handError(response.data.message, loginData.ths);
              //   return;
              // }else if(response.data && response.data.ok === true){
              //   loginData.handOk(loginData.ths);
              //   if(response.data.jwt){
              //     localStorage.setItem('jwt', response.data.jwt);
              //     //this.commit('JWT/SETTOKEN', response.data.jwt);
              //   }
              //   state.userAnonim = false;
              // }

            }
            ).catch(error => console.log(error));



        },


        async getUserData(){

            let qdata = {
                action:  'login/get_user_data',
                component:'login',
                //'username': 'Ivanov_callcenter',
                //'password': 'WPjsnaRB',
                //'rememberme': 1,
                //'login_context': 'web',
                //'jwt':  localStorage.getItem('jwt'),
            };
            // console.log(state);
            this.$http
                .get('api/user-profile', qdata)
                .then(response => {this.info = response

                    //console.log(response.data);
                    if(response.data && response.data.ok === false){
                        return;
                    }
                    this.commit('Login/SET_USER_DATA', response.data.data);
                    //
                }).catch(error => console.log(error+'error'));
        },
    },
//==========================================================

    getters: {
        isAnonim: state => {        return state.userAnonim;      },
        currentUserGroup: state => {     return state.current_user_group;        },
        getServerErrors: state => {return state.serverErrors;   }

    },








}
