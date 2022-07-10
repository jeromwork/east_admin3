export default  {
  healthSpecialsEditFields:{
        id :{ data : { text: 'id', align: 'start', value: 'id', }},
        name : { data : {
              text: 'Название', value: 'name',
                render:{type:'text', col:{md:12}, rowNumber:1},
                serverSettings:{component:'health', actionSave:'specials/set', setAction:'set'},
          },
            },
        iid : { data : {text: 'iid', value: 'iid',  },},
        services : { data : {text: 'Подключенные услуги', value: 'services',
            serverSettings:{component:'health', itemsName:'services', actionSave:'specials/set', setAction:'set', actionGet:'services/getVue', actionSet:'specials/set'},
            render:{type:'multiTags', col:{md:6}, rowNumber:2},},
        },


        off : { data : {text: 'Отключен', value: 'off',
            serverSettings:{component:'health', actionSave:'specials/set', getAction:'getVue', setAction:'set'},
            render:{type:'checkbox', col:{md:6},  rowNumber:2},},
        },
    }

}
