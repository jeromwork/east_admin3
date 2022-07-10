

export default {
    namespaced:true,
    state: {
        menuItems: {//этот массив настроек должен приходить с сервера
          //а настраивать его может суперадминистратор здесь же в east_admin
          DoctorSettings: {id: 1, title: 'Настройки докторов', href: '/doctor-settings', icon: 'mdi-file-account'},
          FilialSettings: {id: 2, title: 'Настройки филиалов', href: '/filial-settings', icon: 'mdi-file-account'},
          DocSelectSettings: {id: 3, title: 'Настройка поиска докторов', href: '/doc-select-settings', icon: 'mdi-file-account'},
          DocSelect: {id: 4, title: 'Подбор доктора', href: '/doc-select-use', icon: 'mdi-file-account'},
          HealthSettings: {id: 5, title: 'Настройка Health', href: '/health-settings', icon: 'mdi-file-account'},
        },


    },
//===========================================================

    mutations: {

    },
//=============================================================
    actions:{

    },
//==========================================================

    getters: {
        menu_items: (state, getters,rootState, rootGetters) =>  {
            // let menuItems = [];
            return rootGetters['Access/accessRules']('mainMenuItems');
          // if(accessMenuItems){
          //   for (let id in accessMenuItems ){
          //
          //       if(state.menuItems[id]){
          //         menuItems.push(state.menuItems[id])
          //       }
          //
          //   }
          //   if(menuItems.length === 0){
          //     //console.log('Проверить, почему нет доступных пунктов меню для данного пользователя')
          //   }
          // }
          //
          //   return menuItems;
        },


    },








}
