//import store from "../../index";

const Access = {
    namespaced:true,
    state: {
        socket: {
            isConnected: false,
            message: '',
            reconnectError: false,
        },
        accessData:[
            {
                value:0,
                text: '',
            }
        ],
        accessLists:{},
        accessRules:{},

        socketData : {},
    },
//===========================================================

    mutations: {
      SET_ACCESS_RULES(state, accessData) {
            state.accessRules = accessData;
        },
      SET_ACCESS_LISTS(state, accessData) {
        state.accessLists = accessData;
      },
        INIT_WEB_SOCKET(state) {
            state.socket = new WebSocket('ws://127.0.0.1:61523');
            state.socket.onmessage = response => {
            console.log(this);
            this.commit('Access/SET_SOCKET_DATA', response);
            }
        },
        SET_SOCKET_DATA(state, response) {
            state.socketData = JSON.parse(response.data);
        },
        PREPARE_ACCESS_RULES(state){
            console.log(state)

        }
    },
//=============================================================
    actions:{
        async getAccessRules(){
            this.$http
                .post('api/get-access-rules', )
                .then(response => {this.info = response
                    if(response.data && response.data.ok === false){
                        return;
                    }

                    this.commit('Access/SET_ACCESS_RULES', response.data);
                    //
                }).catch(error => console.log(error+'error'));
        },


        async getAccessLists(){
          this.$http
            .post('api/get-access-lists', )
            .then(response => {this.info = response
              if(response.data && response.data.ok === false){
                return;
              }

              this.commit('Access/SET_ACCESS_LISTS', response.data);
              //
            }).catch(error => console.log(error+'error'));
        },

        initWebSocket: function(context, message) {
            this.commit('Access/INIT_WEB_SOCKET');
            console.log(message)

        },
        sendToSocket: function(context, data){


            context.state.socket.send(JSON.stringify(data))
        }
    },
//==========================================================

    getters: {
        accessList: state => (component) =>{
            return state.accessLists[component];
        },
        accessRules: state => (component) =>{
            return {...state.accessRules[component]};
          },
        getAllowedFields: state =>(listName, rulesName) =>{
          rulesName = (!rulesName && listName) ? listName : rulesName;
          let headerItems = [];
          let accessList = state.accessLists[listName];
          let accessRules = state.accessRules[rulesName];
          if(accessList && accessRules){
            for (let field in accessRules ){
              if(accessList[field] && accessList[field]['data']){
                headerItems.push(accessList[field]['data'])
              }
            }
          }
          return headerItems;
        },

        getRawAccessList : state => (name) =>{
            return state.accessData[name];
            },

    },

}

//
// let ws = new WebSocket('ws://127.0.0.1:61523');
// ws.onmessage = response => {
//     let positionData = JSON.parse(response.data);
//     console.log(response);
//     unit.style.top = positionData.top;
//     unit.style.left = positionData.left;
//
// }




//import VueNativeSock from 'vue-native-websocket'

// Vue.use(VueNativeSock, 'ws://127.0.0.1:61523', {Access})









// let ws = new WebSocket('ws://127.0.0.1:61523');
// ws.onmessage = response => {
//     //let positionData = JSON.parse(response.data);
//     console.log(response);
//
//
// }
 export default Access;
