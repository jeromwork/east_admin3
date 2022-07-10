export default  {
  healthSpecialsSettings:{
        id :{ data : { text: 'id', align: 'start', value: 'id', }},
        id2 : { data : { text: 'id', align: 'start', value: 'id', },},
        name : { data : {text: 'Название', value: 'name',},},
        iid : { data : {text: 'iid', value: 'iid',  },},
        services : { data : {text: 'Подключенные услуги', value: 'services',
            serverSettings:{ component:'health', itemsName:'services', actionSave:'specials/set', actionGet:'services/getVue', actionSet:'specials/set' },
                render:{type:'multiTags', },},},
        off : { data : {text: 'Отключен', value: 'off',
            serverSettings:{component:'health', actionSave:'specials/set', getAction:'getVue'},
                render:{type:'checkbox', },},},
        //services : { data : {text: 'Подключенные услуги', value: 'services',  renderMultiTags:{component:'health', item:'services', getAction:'getVue', setAction:'set'},},},
        //off : { data :  {text: 'Отключен', value: 'off', renderCheckbox:{type:'multiTags',component:'health', item:'specials', action:'set'},},},
    }
}
